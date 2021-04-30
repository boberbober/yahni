
import { atom, selector, selectorFamily, atomFamily } from 'recoil'

import { db } from '../utils/firebase'


export const lastMaxItemSelector = selector({
	key: 'lastMaxItem',
	default: null,
	get: () => {
		let lastMaxItem = null
		try {
			lastMaxItem = localStorage.getItem('lastMaxItem')
			console.log('lastMaxItem', lastMaxItem)
		} catch (error) { console.error(error) }
		return lastMaxItem ?? null
	},
	// set: ({ set }) => {
	// 	try {
	// 		// const maxitem = await db.child('/maxitem').once('value')
	// 		// console.log('maxitem', maxitem.val())
	// 		localStorage.setItem('lastMaxItem', maxitem.val())
	// 	} catch (error) {
	// 		console.error(error)
	// 	}
	// }
})

export const storyItemSelector = selectorFamily({
	key: 'storyItem',
	get: storyId => async () => {
		try {
			const snap = await db.child(`item/${storyId}`).get()
			console.log('loadable story', snap.val())
			return snap.val()
		} catch (error) {
			console.error(error)
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
	get: (type, start, end) => ({ get }) => {
		console.log('orderedStories.get')
		// get(lastUpdateAtom)
		const stories = get(storiesAtom(type))
		const latestOrder = get(orderAtom)
		
		if (!latestOrder)
			return stories.slice(0, 10)

		const sortedStories = stories.slice().sort((a, b) => b - a)
		return sortedStories.slice(0, 10)
	}
})
