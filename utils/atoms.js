
import { atom, selector, selectorFamily, atomFamily } from 'recoil'

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
})

export const storyItemSelector = selectorFamily({
	key: 'storyItem',
	get: storyId => async () => {
		try {
			const snap = await db.child(`item/${storyId}`).get()
			// console.log('loadable story', snap.val())
			return snap.val()
		} catch (error) {
			// console.warn(error)
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
			// console.warn(error)
			return null
		}
	}
})

export const dbConnectedAtom = atom({
	key: `dbConnected`,
	default: false
})

export const orderAtom = atom({
	key: 'order',
	default: false,
})

export const storiesAtom = atomFamily({
	key: 'stories',
	default: []
})

export const lastUpdateAtom = atom({
	key: 'lastUpdate',
	default: null,
})

export const openStoryIdAtom = atom({
	key: 'openStoryId',
	default: null,
})

export const orderedStoriesSelector = selectorFamily({
	key: 'orderedStories',
	default: [],
	get: ({ type, start, end }) => ({ get }) => {
		console.log('orderedStories.get')
		// get(lastUpdateAtom)
		const stories = get(storiesAtom(type))
		const latestOrder = get(orderAtom)
		
		if (!latestOrder)
			return stories.slice(start, end)

		const sortedStories = stories.slice().sort((a, b) => b - a)
		return sortedStories.slice(start, end)
	}
})


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
	// default: () => { return DEFAULTSETTINGS 	},
})


