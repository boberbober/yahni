
import { atom, selectorFamily, atomFamily, DefaultValue } from 'recoil'
import produce from 'immer'

import DEFAULTSETTINGS from '../utils/defaultSettings'


// localStorage effect

export function loadFromStorage(key) {
	try {
		const storageItem = localStorage.getItem(key)
		const storageObject = JSON.parse(storageItem)
		return storageObject
	} catch { return null }
}

function saveToStorage(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch (error) { console.warn(error) }
}

const storageEffect = (
	prefix, 
	key = '', 
	handleSavedVal = val => val,
) => ({ trigger, setSelf, onSet }) => {

	const storageKey = `${prefix}_${key}`

	if (trigger === 'get' && !storageKey.startsWith('newestFirst')) {
		const savedValue = loadFromStorage(storageKey)
		if (savedValue !== null) {
			setSelf(handleSavedVal(savedValue))
		}
	}

	onSet(value => {
		if (!(value instanceof DefaultValue))
			saveToStorage(storageKey, value)
	})
}

// Atoms and selectors

export const dbConnectedAtom = atom({
	key: `dbConnected`,
	default: null
})

export const storiesAtom = atomFamily({
	key: 'stories',
	default: []
})

export const storyAtom = atomFamily({
	key: 'story',
	default: null
})

export const commentAtom = atomFamily({
	key: 'comment',
	default: null
})

export const openStoryIdAtom = atom({
	key: 'openStoryId',
	default: null,
})

export const storiesSelector = selectorFamily({
	key: 'selectedStories',
	default: [],
	get: ({ type, start, end }) => ({ get }) => {
		const stories = get(storiesAtom(type))
		return get(newestFirstAtom(type))
			? stories.slice().sort((a, b) => b - a).slice(start, end)
			: stories.slice(start, end)
	}
})

export const storiesStatsSelector = selectorFamily({
	key: 'storiesStats',
	default: { total: 0 },
	get: type => ({ get }) => {
		const stories = get(storiesAtom(type))
		return { total: stories.length }
	}
})

export const newestFirstAtom = atomFamily({
	key: 'newestFirst',
	default: false,
	effects_UNSTABLE: key => [storageEffect('newestFirst', key)]
})

export const lastVisitAtom = atom({
	key: 'lastVisit',
	default: null,
})


// Poll options

export const polloptAtom = atomFamily({
	key: 'pollopt',
	default: null
})



// Opened stories

export const openedStoriesAtom = atom({
	key: 'openedStories',
	default: {},
	effects_UNSTABLE: [storageEffect('openedStories')]
})

export const openedStorySelector = selectorFamily({
	key: 'openedStory',
	default: null,
	get: id => ({ get }) => {
		const openedStories = get(openedStoriesAtom)
		return openedStories[id] || null
	},
	set: id => ({ set }, desc) => {
		set(openedStoriesAtom, prev => produce(prev, draft => {
			draft[id] = {
				time: Date.now(),
				desc,
			}
		}))
	}
})


// Settings

export const settingsAtom = atom({
	key: 'settings',
	default: DEFAULTSETTINGS,
	effects_UNSTABLE: [
		storageEffect('settings', '', val => ({ ...DEFAULTSETTINGS, ...val }))
	]
})

