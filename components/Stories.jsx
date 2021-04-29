
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { storiesAtom, dbConnectedAtom } from '../utils/atoms'
import Story from '../components/Story'
import { db } from '../utils/firebase'


const STORIESPERPAGE = 10

export default function Stories({ type }) {

	const dbConnected = useRecoilValue(dbConnectedAtom)
	const [isFetching, setFetching] = React.useState(null) 
	const [stories, setStories] = useRecoilState(storiesAtom(type))
	const [start, setStart] = React.useState(0)
	const [end, setEnd] = React.useState(STORIESPERPAGE)

	const handleFetch = async () => {
		console.log('fetch')
		setFetching(true)
		const snap = await db.child(`/${type}stories`).once('value')
		setStories(snap.val())
		setFetching(false)
	}

	const handleMore = () => {
		// setStart(prev => prev + STORIESPERPAGE)
		setEnd(prev => prev + STORIESPERPAGE)
	}

	React.useEffect(() => {
		if (dbConnected) handleFetch()
	}, [dbConnected])


	const someStories = stories.slice(start, end)

	return <div>

		{/* { isFetching && <p>Fetching stories...</p> } */}

		<ul id='Stories'>
			{ someStories.map(id => 
				<Story key={id} id={id} />
			)}
		</ul>

		<button onClick={handleMore}>More</button> ({ start } - { end })

	</div>
}
