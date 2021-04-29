
import { atom, selector, selectorFamily, atomFamily } from 'recoil'


export const lastMaxItemSelector = selector({
	key: 'lastMaxItem',
	default: null,
	get: () => {
		let lastMaxItem = null
		try {
			lastMaxItem = localStorage.getItem('lastMaxItem')
		} catch (error) { console.error(error) }
		return lastMaxItem ?? null
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

export const orderedStoriesSelector = selectorFamily({
	key: 'orderedStories',
	default: [],
	get: type => ({ get }) => {
		const stories = get(storiesAtom(type))
		const latestOrder = get(orderAtom)
		if (!latestOrder)
			return stories
		return stories.slice().sort((a, b) => b - a)
	}
})
