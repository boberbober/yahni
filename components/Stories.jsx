
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { storiesAtom, dbConnectedAtom, orderAtom, orderedStoriesSelector } from '../utils/atoms'
import Story from '../components/Story'
import { db } from '../utils/firebase'


const STORIESPERPAGE = 25

export default function Stories({ type }) {

	const dbConnected = useRecoilValue(dbConnectedAtom)
	const [isFetching, setFetching] = React.useState(null) 
	const [stories, setStories] = useRecoilState(storiesAtom(type))
	const [start, setStart] = React.useState(0)
	const [end, setEnd] = React.useState(STORIESPERPAGE)
	const storiesLen = stories.length
	const [latestOrder, setLatestOrder] = useRecoilState(orderAtom)
	const orderedStories = useRecoilValue(orderedStoriesSelector(type))

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

	const handleOrder = event => {
		setLatestOrder(event.target.checked)
	}

	React.useEffect(() => {
		if (dbConnected && !!db)
			handleFetch()
	}, [dbConnected])

	// const someStories = stories.slice(start, end)
	const someStories = orderedStories.slice(start, end)

	return <main>

		{/* { isFetching && <p>Fetching stories...</p> } */}

		<label>
			<input type='checkbox'
				onChange={handleOrder}
				checked={latestOrder}
			/> order by latest
		</label>

		<ul id='Stories'>
			{ someStories.map(id => 
				<Story key={id} id={id} />
			)}
		</ul>

		{ (storiesLen > 0 && end < storiesLen) &&
			<button onClick={handleMore}>More ({ start } - { end } / {storiesLen})</button> }

		{ (storiesLen > 0 && end >= storiesLen) &&
			<p>end.</p> }

		{/* <pre>{ JSON.stringify(someStories, null, 2) }</pre> */}

	</main>
}
