
import { atom, selector, selectorFamily, atomFamily, DefaultValue } from 'recoil'
import produce from 'immer'

import DEFAULTSETTINGS from '../utils/defaultSettings'


// localStorage effect

function loadFromStorage(key) {
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

	if (trigger === 'get') {
		const savedValue = loadFromStorage(storageKey)
		if (savedValue !== null) {
			console.log(savedValue)
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
		const newestFirst = get(newestFirstAtom(type))
		if (!newestFirst)
			return stories.slice(start, end)
		const sortedStories = stories.slice().sort((a, b) => b - a)
		return sortedStories.slice(start, end)
	}
})

export const newestFirstAtom = atomFamily({
	key: 'newestFirst',
	default: false,
	effects_UNSTABLE: key => [storageEffect('newestFirst', key)]
})

export const lastMaxItemSelector = selector({
	key: 'lastMaxItem',
	default: null,
	get: () => {
		let lastMaxItem = null
		try {
			const storageItem = localStorage.getItem('lastMaxItem')
			lastMaxItem = !!storageItem && parseInt(storageItem)
		} catch (error) { console.error(error) }
		return lastMaxItem || null
	},
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

