
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
import { Helmet } from 'react-helmet'
import { useRouter } from 'next/router'

import Snippet from './Snippet'
import Story from './Story'
import { db } from '../utils/firebase'
import PAGES from '../utils/pages'

import { 
	storiesAtom, 
	dbConnectedAtom, 
	newestFirstAtom, 
	storiesSelector, 
	openStoryIdAtom,
	settingsAtom,
} from '../utils/atoms'

const STORIESPERPAGE = 50


export default function Stories({ type }) {

	const { title } = PAGES[type]
	const dbConnected = useRecoilValue(dbConnectedAtom)
	const [stories, setStories] = useRecoilState(storiesAtom(type))
	const storiesLen = stories.length
	const [end, setEnd] = React.useState(STORIESPERPAGE)
	const [newestFirst, setNewestFirst] = useRecoilState(newestFirstAtom(type))
	const selectedStories = useRecoilValue(storiesSelector({ type, start: 0, end }))
	const [openStoryId, setOpenStoryId] = useRecoilState(openStoryIdAtom)
	const { liveUpdates, infiniteScroll } = useRecoilValue(settingsAtom)
	const initLoaded = React.useRef(false)
	const { asPath } = useRouter()

	const scrollRef = useBottomScrollListener(() => infiniteScroll && nextPage(),
		{ debounce: 200, offset: 100, triggerOnNoScroll: false }
	)

	const nextPage = () => {
		const nextEnd = end + STORIESPERPAGE
		if (end > storiesLen) return
		setEnd(nextEnd)
	}
	
	React.useEffect(() => {

		if (!dbConnected || !db) return

		try {
			localStorage.setItem('lastVisit', Math.round(Date.now() / 1000))
		} catch {}
		
		const handleUpdate = snap => {
			// story ids from /new API endpoint appear on the list before the item details are available so we wait a little to fetch them 
			const stories = snap.val()
			if (!initLoaded.current || type !== 'new') {
				initLoaded.current = true
				setStories(stories)
			} else {
				setTimeout(() => setStories(stories), 12000)
			}
		}

		if (liveUpdates) {
			db.child(`/${type}stories`).on('value', handleUpdate)
			return () => db.child(`/${type}stories`).off()
		}

		db.child(`/${type}stories`).once('value', handleUpdate)

	}, [dbConnected, liveUpdates])

	React.useEffect(() => {
		const anchorMatch = asPath.match(/#(\d{8})$/)
		const anchorId = parseInt(anchorMatch?.[1])
		if (anchorId) {
			setOpenStoryId(anchorId)
		} else if (openStoryId) {
			setOpenStoryId(null)
		}
	}, [asPath])

	return <main id='StoriesPage' 
		className={!!openStoryId ? 'storyOpened' : 'storyClosed'}
	>

		<Helmet>
			<title>{title}</title>
		</Helmet>

		<div id='Stories' ref={scrollRef}>

			{ (!dbConnected && !storiesLen) &&
				<p><span className='loading'>Connecting...</span></p> }
			
			{ (dbConnected && !storiesLen) &&
				<p><span className='loading'>Loading stories...</span></p> }

			{ (!!storiesLen && ['top', 'best', 'ask', 'show'].includes(type)) && 
				<label className='newestFirst'>
					<input type='checkbox'
						onChange={event => setNewestFirst(event.target.checked)}
						checked={newestFirst}
					/> newest first
				</label>
			}

			<ul id='StoriesList'>
				{ selectedStories.map(id => <Snippet key={id} storyId={id} /> )}
			</ul>

			{ (!infiniteScroll && storiesLen > 0 && end < storiesLen) &&
				<button id='moreStoriesButton'
					onClick={nextPage}
				>
					Load more
				</button> 
			}

			{ (storiesLen > 0 && end >= storiesLen) &&
				<p id='storiesEnd'>end</p> }

		</div>

		{ !!openStoryId && <Story /> }

	</main>
}
