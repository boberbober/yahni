
import React from 'react'
import { selectorFamily, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import cn from 'classnames'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { lastMaxItemSelector, openStoryIdAtom, storyItemSelector } from '../utils/atoms'
import Comments from './Comments'

const cleanUrl = url => url.replace(/^(https?:\/\/(www\.)?)|(\/.*$)/g, '')


export default function StoryPage() {

	const lastMaxItem = useRecoilValue(lastMaxItemSelector)
	const [storyId, setOpenStoryId] = useRecoilState(openStoryIdAtom)
	const loadable = useRecoilValueLoadable(storyItemSelector(storyId))
	
	if (loadable.state === 'loading')
		return <li className='story sLoading'>
			<span className='sLink'>loading...</span>
			<p className='sSub'>...</p>
		</li>

	if (loadable.state === 'hasError') {
		console.warn('story hasError', storyId)
		return <li>error</li>
	}

	const story = loadable.contents  

	if (!story) { 
		console.warn('no story', storyId)
		return <li>#{storyId}</li>
	}
	
	return <div id='StoryPage'
		// className={cn(`story s-${story.type}`, {
		// 	sNew: lastMaxItem < storyId,
		// 	sOpen: openStoryId === storyId
		// })}
	>

		<button onClick={() => setOpenStoryId(null)}>close</button>

		<h1>
			{ story.title }
		</h1>

		<p>{ storyId }</p>

		{ story.url &&
			<p>
				<a href={story.url}>{story.url}</a>
			</p>
		}

		<p>
			<span>
				{ dayjs.unix(story.time).fromNow() }
			</span> by <span>
				{ story.by }
			</span>
		</p>

		<p>
			<a href={`https://news.ycombinator.com/item?id=${storyId}`}>
				read on HackerNews
			</a>
		</p>

		{ story.type !== 'job' &&  <>

			<h3>
				{ story.score } { story.score > 1 ? 'points' : 'point' }
			</h3>

			<h4>
				{ !story.descendants ? "no comments"
					: story.descendants > 1 
					? `${story.descendants} comments` 
					: 'one comment' 
				}
			</h4>

		</>}

		{ story.text &&
			<div dangerouslySetInnerHTML={{__html: story.text}} /> }

		{/* <pre>{ JSON.stringify(story, null, 2) }</pre> */}

		<Comments story={story} />

	</div>
}