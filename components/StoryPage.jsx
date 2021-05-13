
import React from 'react'
import { useSetRecoilState, useRecoilState } from 'recoil'

import Comments from './Comments'
import Time from './Time'
import UserText from './UserText'
import fetchItem from '../utils/fetchItem'

import { 
	openedStorySelector, 
	openStoryIdAtom, 
	storyAtom, 
} from '../utils/atoms'



export default function StoryPage() {

	const [storyId, setOpenStoryId] = useRecoilState(openStoryIdAtom)
	const setOpenedStory = useSetRecoilState(openedStorySelector(storyId))
	const [story, setStory] = useRecoilState(storyAtom(storyId))
	const ref = React.useRef(null)

	React.useEffect(() => {
		if (story === null)
			fetchItem(storyId, setStory)
	}, [story])

	React.useEffect(() => {
		if (story)
			setOpenedStory(story.descendants || 0)
	}, [setOpenedStory, story])

	React.useEffect(() => {
		if (ref.current)
			ref.current.scrollTop = 0
	}, [storyId])
	
	if (!story) { 
		return <div id='StoryPage'>
			<p>Loading...</p>
		</div>
	}
	
	return <div id='StoryPage' ref={ref}>

		<button id='storyCloseButton'
			onClick={() => setOpenStoryId(null)}
		>
			close
		</button>

		<h1>{ story.title }</h1>

		{ story.url &&
			<a className='storyLink'
				href={story.url} rel='noopener'
			>
				{story.url}
			</a>
		}

		<p className='storyInfo'>
			{ story.score } { story.score > 1 ? 'points' : 'point' } | <Time time={story.time} /> by <a className='storyBy' href={`https://news.ycombinator.com/user?id=${story.by}`}>{ story.by }</a> | <a href={`https://news.ycombinator.com/item?id=${storyId}`}
				rel='noopener'
			>
				read on HN
			</a>
		</p>

		{ story.text &&
			<UserText className='storyText' text={story.text} /> }

		{ story.type !== 'job' &&  <>

			<h4>
				{ !story.descendants ? "no comments"
					: story.descendants > 1 
					? `${story.descendants} comments` 
					: 'one comment' 
				}
			</h4>

		</>}

		<Comments story={story} />

	</div>
}