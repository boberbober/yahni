
import React from 'react'

import firebase from 'firebase/app'
import 'firebase/database'

let db

if (!firebase.apps.length) {
	firebase.initializeApp({
		databaseURL: 'https://hacker-news.firebaseio.com'
	})
	db = firebase.database().ref('/v0')
}


function HomePage() {

	const [stories, setStories] = React.useState([])

	const handleFetch = async () => {
		
		console.log('fetch')
		const snap = await db.child('/topstories').once('value')

		const allItems = snap.val()
		const items = allItems.slice(0, 10)
		const stories = []

		for (const id of items) {
			console.log(id)
			const snap = await db.child(`item/${id}`).get()
			stories.push(snap.val())
		}
		setStories(stories)
	}

	return <div>
		
		<button onClick={handleFetch}>fetch</button>

		<pre>{ JSON.stringify(stories, null, 2) }</pre>
		
	</div>
}

export default HomePage

