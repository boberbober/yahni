
import React from 'react'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'

import Comments from './Comments'
import Time from './Time'
import UserText from './UserText'

import { 
	openedStorySelector, 
	openStoryIdAtom, 
	storyItemSelector 
} from '../utils/atoms'



export default function StoryPage() {

	const [storyId, setOpenStoryId] = useRecoilState(openStoryIdAtom)
	const loadable = useRecoilValueLoadable(storyItemSelector(storyId))
	const [openedStory, setOpenedStory] = useRecoilState(openedStorySelector(storyId))
	
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

	React.useEffect(() => {
		setOpenedStory(story.descendants || 0)
	}, [setOpenedStory])
	
	return <div id='StoryPage'>

		<button onClick={() => setOpenStoryId(null)}>close</button>

		<p>story opened: {JSON.stringify(openedStory)}</p>

		<h1>
			{ story.title }
		</h1>

		<p>{ storyId }</p>

		{ story.url &&
			<p>
				<a href={story.url} rel='noopener'>
					{story.url}
				</a>
			</p>
		}

		<p>
			<Time time={story.time} /> by <span>
				{ story.by }
			</span>
		</p>

		<p>
			<a href={`https://news.ycombinator.com/item?id=${storyId}`}
				rel='noopener'
			>
				read on HackerNews
			</a>
		</p>

		{ story.text &&
			<UserText text={story.text} /> }

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

		<Comments story={story} />

	</div>
}