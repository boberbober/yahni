
import { atom, selector, selectorFamily, atomFamily, DefaultValue } from 'recoil'

import DEFAULTSETTINGS from '../utils/defaultSettings'
import produce from 'immer'

const hasStorage = () => typeof window !== 'undefined' && !!window.localStorage


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

const storageEffect = (prefix, key = '') => ({ trigger, setSelf, onSet }) => {

	const storageKey = `${prefix}_${key}`

	if (trigger === 'get') {
		// console.log('storage effect get', prefix, key)
		const savedValue = loadFromStorage(storageKey)
		if (savedValue !== null)
			setSelf(savedValue)
	}

	onSet(value => {
		// console.log('storage effect set', key, value)
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


// export const storyItemsAtom = atomFamily({
// 	key: 'storyItems',
// 	default: null
// })
// export const storyItemSelector = selectorFamily({
// 	key: 'storyItem',
// 	get: storyId => async ({ get }) => {
// 		// const story = get(storyItemsAtom(storyId))
// 		// if (story)
// 		// 	return story
// 		try {
// 			console.log('load story')
// 			const snap = await db.child(`item/${storyId}`).get()
// 			return snap.val()
// 		} catch (error) {
// 			return null
// 		}
// 	},
// 	set: storyId => ({ set }, story) => {
// 		console.log('story selector set (disabled)', storyId, story)
// 		// set(storyItemsAtom(storyId), story)
// 	}
// })
// export const storyItemSelector = selectorFamily({
// 	key: 'storyItem',
// 	get: storyId => async () => {
// 		try {
// 			const snap = await db.child(`item/${storyId}`).get()
// 			return snap.val()
// 		} catch (error) {
// 			return null
// 		}
// 	},
// })


export const openStoryIdAtom = atom({
	key: 'openStoryId',
	default: null,
})

export const orderedStoriesSelector = selectorFamily({
	key: 'orderedStories',
	default: [],
	get: ({ type, start, end }) => ({ get }) => {
		const stories = get(storiesAtom(type))
		const latestOrder = get(orderAtom(type))
		if (!latestOrder)
			return stories.slice(start, end)
		const sortedStories = stories.slice().sort((a, b) => b - a)
		return sortedStories.slice(start, end)
	}
})



// export const commentSelector = selectorFamily({
// 	key: 'comment',
// 	get: id => async () => {
// 		try {
// 			const snap = await db.child(`item/${id}`).get()
// 			return snap.val()
// 		} catch (error) {
// 			return null
// 		}
// 	}
// })


export const orderAtom = atomFamily({
	key: 'order',
	default: false,
	effects_UNSTABLE: key => [storageEffect('order', key)]
})


export const lastMaxItemSelector = selector({
	key: 'lastMaxItem',
	default: null,
	get: () => {
		let lastMaxItem = null
		if (hasStorage()) {
			const storageItem = localStorage.getItem('lastMaxItem')
			lastMaxItem = !!storageItem && parseInt(storageItem)
		}
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

// Visited links

export const visitedLinksAtom = atom({
	key: 'visitedLinks',
	default: {},
	effects_UNSTABLE: [storageEffect('visitedLinks')]
})

// export const openedStorySelector = selectorFamily({
// 	key: 'openedStory',
// 	default: null,
// 	get: id => ({ get }) => {
// 		const openedStories = get(openedStoriesAtom)
// 		return openedStories[id] || null
// 	},
// 	set: id => ({ set }, desc) => {
// 		set(openedStoriesAtom, prev => produce(prev, draft => {
// 			draft[id] = {
// 				time: Date.now(),
// 				desc,
// 			}
// 		}))
// 	}
// })




const storeSettingsEffect = ({ onSet }) => {
	onSet(settings => {
		try {
			if (hasStorage())
				localStorage.setItem('settings', JSON.stringify(settings))
		} catch (error) { console.warn(error) }
	})
}

export const settingsAtom = atom({
	key: 'settings',
	default: new Promise(resolve => {
		let settings = { ...DEFAULTSETTINGS }
		try {
			if (hasStorage()) {
				const storageItem = localStorage.getItem('settings')
				if (storageItem) {
					const storageSettings = JSON.parse(storageItem)
					if (storageSettings && storageSettings.hasOwnProperty('isDefault'))
						settings = Object.assign(settings, storageSettings)
				}
			}
		} catch (error) { console.warn(error) }
		resolve(settings)
	}),
	effects_UNSTABLE: [storeSettingsEffect]
})
