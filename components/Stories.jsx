
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'

import Story from '../components/Story'
import StoryPage from '../components/StoryPage'
import { db } from '../utils/firebase'

import { 
	storiesAtom, 
	dbConnectedAtom, 
	orderAtom, 
	orderedStoriesSelector, 
	// lastUpdateAtom,
	openStoryIdAtom,
	settingsAtom,
} from '../utils/atoms'

const STORIESPERPAGE = 50


export default function Stories({ type }) {

	const dbConnected = useRecoilValue(dbConnectedAtom)
	const [stories, setStories] = useRecoilState(storiesAtom(type))
	const [start] = React.useState(0)
	const [end, setEnd] = React.useState(STORIESPERPAGE)
	const storiesLen = stories.length
	const [latestOrder, setLatestOrder] = useRecoilState(orderAtom(type))
	// const setLastUpdate = useSetRecoilState(lastUpdateAtom)
	const orderedStories = useRecoilValue(orderedStoriesSelector({ type, start, end }))
	const openStoryId = useRecoilValue(openStoryIdAtom)
	const { infiniteScroll } = useRecoilValue(settingsAtom)

	const scrollRef = useBottomScrollListener(() => infiniteScroll && nextPage(),
		{ debounce: 200, offset: 100, triggerOnNoScroll: false }
	)

	const nextPage = () => {
		const nextEnd = end + STORIESPERPAGE
		if (nextEnd > storiesLen) return
		setEnd(nextEnd)
	}
	
	const handleOrder = event => {
		setLatestOrder(event.target.checked)
	}

	const handleUpdate = React.useCallback(snap => {
		const stories = snap.val()
		setStories(stories)
		console.log('update')
		// setLastUpdate(Date.now())
	}, [dbConnected])

	React.useEffect(() => {
		
		if (!dbConnected || !db)
			return

		function unsubscribe() {
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


	return <main id='MainStories'>

		<div id='Stories' ref={scrollRef}>

			{ (dbConnected && !storiesLen) &&
				<p>Loading stories...</p> }

			{ (!dbConnected && !storiesLen) &&
				<p>Connecting...</p> }

			{ (!!storiesLen && ['top', 'best', 'ask', 'show'].includes(type)) && 
				<label className='orderLatest'>
					<input type='checkbox'
						onChange={handleOrder}
						checked={latestOrder}
					/> newest first
				</label>
			}

			<ul id='StoriesList'>
				{ orderedStories.map(id => 
					<Story key={id} storyId={id} />
				)}
			</ul>

			{ (!infiniteScroll && storiesLen > 0 && end < storiesLen) &&
				<button 
					id='moreStoriesButton'
					onClick={() => nextPage()}
				>
					Load more
				</button> 
			}

			{/* <p>({ start } - { end } / {storiesLen})</p> */}

			{ (storiesLen > 0 && end >= storiesLen) &&
				<p id='storiesEnd'>end</p> }

		</div>

		{ !!openStoryId && <StoryPage /> }

	</main>
}
