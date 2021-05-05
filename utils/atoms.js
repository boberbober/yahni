
import { atom, selector, selectorFamily, atomFamily, DefaultValue } from 'recoil'

import { db } from '../utils/firebase'
import DEFAULTSETTINGS from '../utils/defaultSettings'

const hasStorage = () => typeof window !== 'undefined' && !!window.localStorage


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
	// set: ({ set }, value) => {
	// 	localStorage.setItem('lastMaxItem', value)
	// 	set(value)
	// }
})

export const storyItemSelector = selectorFamily({
	key: 'storyItem',
	get: storyId => async () => {
		try {
			const snap = await db.child(`item/${storyId}`).get()
			return snap.val()
		} catch (error) {
			return null
		}
	}
})

export const commentSelector = selectorFamily({
	key: 'comment',
	get: id => async () => {
		try {
			const snap = await db.child(`item/${id}`).get()
			return snap.val()
		} catch (error) {
			return null
		}
	}
})

export const dbConnectedAtom = atom({
	key: `dbConnected`,
	default: false
})




function loadFromStorage(key) {
	try {
		const storageItem = localStorage.getItem(key)
		const storageObject = JSON.parse(storageItem)
		return storageObject
	} catch {
		return null
	}
}

function saveToStorage(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch {}
}


const storageEffect = (prefix, key = '') => ({ trigger, setSelf, onSet }) => {

	const storageKey = `${prefix}_${key}`

	if (trigger === 'get') {
		console.log('storage effect get', prefix, key)
		const savedValue = loadFromStorage(storageKey)
		if (savedValue !== null)
			setSelf(savedValue)
	}

	onSet(value => {
		console.log('onSet', key, value)
		if (!(value instanceof DefaultValue))
			saveToStorage(storageKey, value)
	})
}


export const orderAtom = atomFamily({
	key: 'order',
	default: false,
	effects_UNSTABLE: key => [storageEffect('order', key)]
})


// export const settingsAtom = atom({
// 	key: 'settings',
// 	default: new Promise(resolve => {
// 		console.log('default storage settings')
// 		let settings = { ...DEFAULTSETTINGS }
// 		try {
// 			if (hasStorage()) {
// 				const storageItem = localStorage.getItem('settings')
// 				if (storageItem) {
// 					const storageSettings = JSON.parse(storageItem)
// 					if (storageSettings && storageSettings.hasOwnProperty('isDefault'))
// 						settings = Object.assign(settings, storageSettings)
// 				}
// 			}
// 		} catch (error) { console.warn(error) }
// 		resolve(settings)
// 	}),
// 	effects_UNSTABLE: [storeSettingsEffect]
// })





export const storiesAtom = atomFamily({
	key: 'stories',
	default: []
})

// export const lastUpdateAtom = atom({
// 	key: 'lastUpdate',
// 	default: null,
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



const storeSettingsEffect = ({ onSet }) => {
	onSet(settings => {
		console.log('onSet', settings)
		try {
			if (hasStorage())
				localStorage.setItem('settings', JSON.stringify(settings))
		} catch (error) { console.warn(error) }
	})
}

export const settingsAtom = atom({
	key: 'settings',
	default: new Promise(resolve => {
		console.log('default storage settings')
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
