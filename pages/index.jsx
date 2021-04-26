
import React from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import firebase from 'firebase/app'
import 'firebase/database'

let db

if (!firebase.apps.length) {
	firebase.initializeApp({
		databaseURL: 'https://hacker-news.firebaseio.com'
	})
	db = firebase.database().ref('/v0')
}


export default function HomePage() {

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

		<ul>
			{ stories.map(story =>
				<Story key={story.id} data={story} />
			)}
		</ul>

		<pre>{ JSON.stringify(stories, null, 2) }</pre>
		
	</div>
}


function Story({ data }) {

	return <li>

		[{ data.score }]

		<a href={data.url}>
			{ data.title }
		</a>

		<br />

		by { data.by } -  
		
		{ dayjs.unix(data.time).fromNow() } - 
		
		{ data.descendants } comments - 
		
		{ data.url }

	</li>
}