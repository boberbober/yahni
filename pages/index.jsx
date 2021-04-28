
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { topStoriesAtom, dbConnectedAtom } from '../utils/atoms'
import Story from '../components/Story'
import { db } from '../utils/firebase'


export default function HomePage() {

	const dbConnected = useRecoilValue(dbConnectedAtom)
	const [isFetching, setFetching] = React.useState(null) 
	const [stories, setStories] = useRecoilState(topStoriesAtom)

	const handleFetch = async () => {
		console.log('fetch')
		setFetching(true)
		const snap = await db.child('/topstories').once('value')
		setStories(snap.val())
		setFetching(false)
	}

	React.useEffect(() => {
		if (dbConnected) handleFetch()
	}, [dbConnected])

	const someStories = stories.slice(0, 10)

	return <div>

		<p>{ dbConnected ? 'connected' : 'not connected' }</p>

		<button onClick={handleFetch}>fetch</button>

		{ isFetching &&
			<p>Fetching stories...</p> }

		<ul>
			{ someStories.map(id => 
				<Story key={id} id={id} />
			)}
		</ul>

	</div>
}
