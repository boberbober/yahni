
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { Helmet } from 'react-helmet'

import Story from '../components/Story'
import StoryPage from '../components/StoryPage'
import { db } from '../utils/firebase'

import { 
	storiesAtom, 
	dbConnectedAtom, 
	orderAtom, 
	orderedStoriesSelector, 
	openStoryIdAtom,
	settingsAtom,
} from '../utils/atoms'

const STORIESPERPAGE = 50


export default function Stories({ type }) {

	const dbConnected = useRecoilValue(dbConnectedAtom)
	const [stories, setStories] = useRecoilState(storiesAtom(type))
	const [start] = React.useState(0)
	const [end, setEnd] = React.useState(STORIESPERPAGE)
	const [latestOrder, setLatestOrder] = useRecoilState(orderAtom(type))
	const orderedStories = useRecoilValue(orderedStoriesSelector({ type, start, end }))
	const storiesLen = stories.length
	const openStoryId = useRecoilValue(openStoryIdAtom)
	const { infiniteScroll } = useRecoilValue(settingsAtom)
	const initLoaded = React.useRef(false)

	const scrollRef = useBottomScrollListener(() => infiniteScroll && nextPage(),
		{ debounce: 200, offset: 100, triggerOnNoScroll: false }
	)

	const nextPage = () => {
		const nextEnd = end + STORIESPERPAGE
		if (end > storiesLen) return
		setEnd(nextEnd)
	}
	
	const handleOrder = event => {
		setLatestOrder(event.target.checked)
	}

	React.useEffect(() => {
		
		if (!dbConnected || !db) return

		const handleUpdate = snap => {
			const stories = snap.val()
			console.log('stories update:', type, initLoaded.current)
			if (!initLoaded.current || type !== 'new') {
				initLoaded.current = true
				setStories(stories)
			} else {
				setTimeout(() => setStories(stories), 10000)
			}
		}

		db.child(`/${type}stories`).on('value', handleUpdate)

		async function setLastMaxItem() {
			try {
				const maxitem = await db.child('/maxitem').once('value')
				localStorage.setItem('lastMaxItem', maxitem.val())
			} catch (error) { console.error(error) }	
		}
		setLastMaxItem()
		
		return () => db.child(`/${type}stories`).off()

	}, [dbConnected])


	return <main id='MainStories'>

		<Helmet>
			<title>{type}</title>
		</Helmet>

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
					// <li key={id}>{id}</li>
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
