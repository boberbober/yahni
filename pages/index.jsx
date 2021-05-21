
import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import { useRecoilCallback, useSetRecoilState, useRecoilValue } from 'recoil'

import List from '../components/List'

// import { db } from '../utils/firebase'
// const db =

import { 
	storiesAtom, 
	storyAtom, 
	dbConnectedAtom, 
	newestFirstAtom, 
	storiesSelector, 
	openStoryIdAtom,
	settingsAtom,
	storiesStatsSelector,
} from '../utils/atoms'

export default function TopStories({ stories, snippets }) {

	// const setStories = useSetRecoilState(storiesAtom('top'))
	// const [story, setStory] = useRecoilState(storyAtom(storyId))

	// const initStore = useRecoilCallback(({ set }) => async (stories, snippets) => {
	// 	console.log(stories)
	// })

	// initStore(stories, snippets)

	// if (!!stories) {
	// 	console.log('set stories', stories.length)
	// 	setStories(stories)
	// }

	// if (!!snippets) {

	// }

	return <List type='top' />
}


export const getServerSideProps = async () => {
	
	if (!firebase.apps.length) {
		console.log('init firebase')
		firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })
		// firebase.database().ref('.info/connected').on('value', connectedListener)
	}
	
	const db = firebase.database().ref('/v0')

	const snap = await db.child(`/topstories`).once('value')

	const stories = snap.val()

	console.log(stories.length)

	const snippets = await Promise.all(stories.slice(0,10).map(async (storyId) => {
		const snap = await db.child(`item/${storyId}`).get()
		return snap.val()
	}))

	console.log(snippets.length)

	return {
		props: {
			type: 'top',
			stories,
			snippets,
		}
	}
}


// const snap = await db.child(`item/${itemId}`).get()
