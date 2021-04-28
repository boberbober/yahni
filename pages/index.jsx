
import React from 'react'
import { useRecoilState } from 'recoil'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import useFirebase from '../helpers/useFirebase'
import { topStoriesAtom } from '../atoms'
import Story from '../components/Story'

export default function HomePage() {

	const [dbConnected, db] = useFirebase()
	const [isFetching, setFetching] = React.useState(null) 
	const [stories, setStories] = useRecoilState(topStoriesAtom)


	const handleFetch = async () => {
		
		console.log('fetch')
		setFetching(true)
		const snap = await db.child('/topstories').once('value')

		// const allItems = 
		// const items = allItems.slice(0, 10)
		// const stories = []

		// for (const id of items) {
		// 	console.log(id)
		// 	const snap = await db.child(`item/${id}`).get()
		// 	stories.push(snap.val())
		// }
		setStories(snap.val())
		setFetching(false)
	}


	React.useEffect(() => {
		if (dbConnected) {
			handleFetch()
		}
	}, [dbConnected])

	const someStories = stories.slice(0, 10)


	return <div>

		<p>{ dbConnected ? 'connected' : 'not connected' }</p>

		<button onClick={handleFetch}>fetch</button>

		{ isFetching &&
			<p>Fetching stories...</p> }

		<ul>
			{ someStories.map(id => <Story key={id} id={id} />
			)}
		</ul>

		{/* <pre>{ JSON.stringify(stories, null, 2) }</pre> */}
		
	</div>
}
