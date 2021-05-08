
import React from 'react'
import cn from 'classnames'
import { useRecoilState, useRecoilValue } from 'recoil'

import Time from './Time'
import { db } from '../utils/firebase'

import { 
	lastMaxItemSelector, 
	openStoryIdAtom, 
	settingsAtom,
	openedStorySelector,
	storyAtom,
	// visitedLinksAtom,
} from '../utils/atoms'


const urlDomain = url => url.replace(/^(https?:\/\/(www\.)?)|(\/.*$)/g, '')


export default function Story({ storyId }) {

	const lastMaxItem = useRecoilValue(lastMaxItemSelector)
	const [story, setStory] = useRecoilState(storyAtom(storyId))
	const [openStoryId, setOpenStoryId] = useRecoilState(openStoryIdAtom)
	const { linkNewTab, hideStoryItems } = useRecoilValue(settingsAtom)
	const openedStory = useRecoilValue(openedStorySelector(storyId))
	
	// const handleOpenLink = useRecoilCallback(({ set }) => event => {
	// 	set(visitedLinksAtom, prev => ({ 
	// 		...prev, 
	// 		[storyId]: Date.now()
	// 	}))
	// })

	React.useEffect(() => {
		async function fetchStory() {
			try {
				console.log('fetchStory')
				const snap = await db.child(`item/${storyId}`).get()
				setStory(snap.val())
			} catch (error) {
				console.warn("couldn't fetch story", storyId, error)
			}
		}
		if (story === null)
			fetchStory()
	}, [story])

	if (!story) {
		return <li className='story sLoading'>
			{ !hideStoryItems.score &&
				<span className='sScore'>_</span> }
			{ !hideStoryItems.comments &&
				<button className='sComments'>_</button> }
			<span className='sLink'>...</span>
			{ (!hideStoryItems.date || !hideStoryItems.user) &&
				<p className='sSub'>...</p> }
		</li>
	}
	
	return <li 
		className={cn(`story s-${story.type}`, {
			sNew: lastMaxItem < storyId,
			sOpen: openStoryId === storyId,
			noScore: hideStoryItems.score,
			noComments: hideStoryItems.comments,
		})}
	>

		{ story.type !== 'job' && <>
			
			{ !hideStoryItems.score &&
				<span className='sScore'>
					{ story.score }
				</span>
			}

			{ !hideStoryItems.comments &&
				<button 
					className={cn('sComments', { 
						scOpened: !!openedStory,
						scHasNew: openedStory?.desc < story.descendants,
					})}
					onClick={() => setOpenStoryId(storyId)}
				>
					{ story.descendants }
				</button>
			}

		</>}


		<a 
			className='sLink'
			target={linkNewTab ? '_blank' : '_self'}
			rel='noopener'
			href={story.url ?? `https://news.ycombinator.com/item?id=${storyId}`}
			// onClick={handleOpenLink}
		>
			<span className='sTitle'>{ story.title }</span>
			{ (story.url && !hideStoryItems.domain) &&
				<small className='sUrl'>({ urlDomain(story.url) })</small> }
		</a>


		{ (!hideStoryItems.date || !hideStoryItems.user) &&
			<p className='sSub'>

				{ !hideStoryItems.date && <>
					<Time time={story.time} />
					{' '}
				</>}

				{ !hideStoryItems.user && <>
					<span className='sBy'>
						by { story.by }
					</span>
				</>}

			</p>
		}

	</li>
}