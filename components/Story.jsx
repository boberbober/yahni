
import React from 'react'
import { useSetRecoilState, useRecoilState } from 'recoil'

import Comment from './Comment'
import Pollopt from './Pollopt'
import Time from './Time'
import UserText from './UserText'
import fetchItem from '../utils/fetchItem'

import { 
	openedStorySelector, 
	openStoryIdAtom, 
	storyAtom, 
} from '../utils/atoms'



export default function Story() {

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
		return <div id='Story'>
			<span className='loading'>Loading...</span>
		</div>
	}
	
	return <div id='Story' ref={ref}>

		<button id='storyCloseButton'
			onClick={() => setOpenStoryId(null)}
		>
			close
		</button>

		<h1>{ story.title }</h1>

		{ story.url &&
			<a className='storyLink'
				href={story.url} 
				rel='noopener'
			>
				{story.url}
			</a>
		}

		<p className='storyInfo'>
			{`${story.score} ${story.score > 1 ? "points" : "point"}`}
			{" | "}
			<Time time={story.time} />
			{" by "}
			<a className='storyBy' 
				href={`https://news.ycombinator.com/user?id=${story.by}`}
			>{ story.by }</a>
			{" | "}
			<a href={`https://news.ycombinator.com/item?id=${storyId}`}
				rel='noopener'
			>read on HN</a>
		</p>

		{ story.text &&
			<UserText className='storyText' text={story.text} /> }

		{ (story.type === 'poll' && !!story.parts) &&
			<ul id='storyPoll'>
				{ story.parts.map(id => <Pollopt key={id} polloptId={id} /> )}
			</ul>
		}

		{ story.type !== 'job' && <h4 id='storyCommentCount'>
			{ !story.descendants ? "no comments"
				: story.descendants > 1 
				? `${story.descendants} comments` 
				: "one comment" 
			}
		</h4> }

		{ story.kids?.length &&	<div id='StoryComments'>
			{ story.kids.map(id => <Comment key={id} commentId={id} /> )}
		</div>}

	</div>
}