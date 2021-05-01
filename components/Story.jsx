
import React from 'react'
import { selectorFamily, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import cn from 'classnames'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { 
	lastMaxItemSelector, 
	openStoryIdAtom, 
	storyItemSelector,
	settingsAtom 
} from '../utils/atoms'



const cleanUrl = url => url.replace(/^(https?:\/\/(www\.)?)|(\/.*$)/g, '')


export default function Story({ storyId }) {

	const lastMaxItem = useRecoilValue(lastMaxItemSelector)
	const loadable = useRecoilValueLoadable(storyItemSelector(storyId))
	const [openStoryId, setOpenStoryId] = useRecoilState(openStoryIdAtom)
	const { linkNewTab } = useRecoilValue(settingsAtom)
	
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
			<a href={`https://news.ycombinator.com/item?id=${storyId}`}>
				#{storyId}
			</a>
		</li>
	}
	
	return <li 
		className={cn(`story s-${story.type}`, {
			sNew: lastMaxItem < storyId,
			sOpen: openStoryId === storyId
		})}
	>

		<a 
			className='sLink'
			target={linkNewTab ? '_blank' : '_self'}
			href={story.url ?? `https://news.ycombinator.com/item?id=${storyId}`}
		>
			<span className='sTitle'>{ story.title }</span>
			{ story.url &&
				<small className='sUrl'>({ cleanUrl(story.url) })</small> }
		</a>

		{ story.type !== 'job' && <>
			<span className='sScore'>
				{ story.score }
			</span>
			<button className='sComments'
				onClick={() => setOpenStoryId(storyId)}
			>
				{ story.descendants }
			</button>
		</>}

		{/* { story.type == 'job' &&  <> */}


		<p className='sSub'>
			<span className='sDate'>
				{ dayjs.unix(story.time).fromNow() }
			</span> by <span className='sBy'>
				{ story.by }
			</span>
		</p>

	</li>
}