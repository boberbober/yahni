
import React from 'react'
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import cn from 'classnames'

import Time from './Time'

import { 
	lastMaxItemSelector, 
	openStoryIdAtom, 
	storyItemSelector,
	settingsAtom,
	openedStorySelector,
} from '../utils/atoms'



const cleanUrl = url => url.replace(/^(https?:\/\/(www\.)?)|(\/.*$)/g, '')


export default function Story({ storyId }) {

	const lastMaxItem = useRecoilValue(lastMaxItemSelector)
	const loadable = useRecoilValueLoadable(storyItemSelector(storyId))
	const [openStoryId, setOpenStoryId] = useRecoilState(openStoryIdAtom)
	const { linkNewTab, hideStoryItems } = useRecoilValue(settingsAtom)
	const openedStory = useRecoilValue(openedStorySelector(storyId))
	
	if (loadable.state === 'loading')
		return <li className='story sLoading'>
			<span className='sLink'>loading...</span>
			<p className='sSub'>...</p>
		</li>

	if (loadable.state === 'hasError') {
		// console.warn('story hasError', storyId)
		return <li>error</li>
	}

	const story = loadable.contents  

	if (!story) { 
		// console.warn('no story', storyId)
		return <li>
			<button onClick={() => setOpenStoryId(storyId)}>open</button>
			<a href={`https://news.ycombinator.com/item?id=${storyId}`}
				rel='noopener'
			>
				#{storyId}
			</a>
		</li>
	}
	
	return <li 
		key={`${storyId}-${story.descendants}-${story.score}`}
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
		>
			<span className='sTitle'>{ story.title }</span>
			{ (story.url && !hideStoryItems.domain) &&
				<small className='sUrl'>({ cleanUrl(story.url) })</small> }
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