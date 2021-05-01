
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import Story from '../components/Story'
import StoryPage from '../components/StoryPage'
import { db } from '../utils/firebase'

import { 
	storiesAtom, 
	dbConnectedAtom, 
	orderAtom, 
	orderedStoriesSelector, 
	lastMaxItemSelector,
	lastUpdateAtom,
	openStoryIdAtom,
} from '../utils/atoms'

const STORIESPERPAGE = 10


export default function Stories({ type }) {

	const dbConnected = useRecoilValue(dbConnectedAtom)
	const [isFetching, setFetching] = React.useState(null) 
	const [stories, setStories] = useRecoilState(storiesAtom(type))
	const [start, setStart] = React.useState(0)
	const [end, setEnd] = React.useState(STORIESPERPAGE)
	const storiesLen = stories.length
	const [latestOrder, setLatestOrder] = useRecoilState(orderAtom)
	const lastMaxItem = useRecoilValue(lastMaxItemSelector)
	// const [lastUpdate, setLastUpdate] = React.useState(null)
	const [lastUpdate, setLastUpdate] = useRecoilState(lastUpdateAtom)
	const orderedStories = useRecoilValue(orderedStoriesSelector({ type, start, end }))
	const openStoryId = useRecoilValue(openStoryIdAtom)

	// const handleFetch = async () => {
	// 	console.log('fetch')
	// 	setFetching(true)
	// 	const snap = await db.child(`/${type}stories`).once('value')
	// 	setStories(snap.val())
	// 	setFetching(false)
	// }

	const handleMore = () => {
		setEnd(prev => prev + STORIESPERPAGE)
	}

	const handleOrder = event => {
		setLatestOrder(event.target.checked)
	}

	const handleUpdate = React.useCallback(snap => {
		const stories = snap.val()
		console.log('update', stories.slice(0,5))
		setStories(stories)
		setLastUpdate(Date.now())
		// setTimeout(() => {
		// 	console.log('setStories')
		// }, !lastUpdate ? 1 : 10000)
	}, [dbConnected])

	React.useEffect(() => {
		
		if (!dbConnected || !db)
			return

		function unsubscribe() {
			console.log('unsubscribe')
			db.off()
		}
		db.child(`/${type}stories`).on('value', handleUpdate)

		async function setLastMaxItem() {
			try {
				const maxitem = await db.child('/maxitem').once('value')
				// console.log('maxitem', maxitem.val())
				localStorage.setItem('lastMaxItem', maxitem.val())
			} catch (error) { console.error(error) }	
		}
		setLastMaxItem()
		
		return unsubscribe

	}, [dbConnected])


	function clearStorage() {
		localStorage.removeItem('lastMaxItem')
	}

	// const someStories = stories.slice(start, end)
	// const someStories = orderedStories.slice(start, end)

	return <main id='MainStories'>

		{/* { isFetching && <p>Fetching stories...</p> } */}
		{/* <button onClick={clearStorage}>clear storage</button> */}
		{/* <p>lastmaxitem: {lastMaxItem}</p> */}
		{/* <p>lastupdate: {lastUpdate}</p> */}

		<div id='Stories'>

			<label>
				<input type='checkbox'
					onChange={handleOrder}
					checked={latestOrder}
				/> order by latest
			</label>

			<ul>
				{ orderedStories.map(id => 
					<Story key={id} storyId={id} />
				)}
			</ul>

			{ (storiesLen > 0 && end < storiesLen) &&
				<button onClick={handleMore}>More ({ start } - { end } / {storiesLen})</button> }

			{ (storiesLen > 0 && end >= storiesLen) &&
				<p>end.</p> }

		</div>

		{ !!openStoryId && <StoryPage /> }

	</main>
}
