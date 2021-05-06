
import React from 'react'
import { useRecoilCallback, useRecoilState, useRecoilValueLoadable } from 'recoil'

import { db } from '../utils/firebase'
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


	const refresh = useRecoilCallback(({ set }) => async (id) => {
		console.log('refetch story', storyId, id)
		const snap = await db.child(`item/${storyId}`).get()
		const val = snap.val()
		console.log(val)
		set(storyItemSelector(storyId), val || null)
	})

	// React.useEffect(() => {
	// 	const intervalId = setInterval(refresh, 2000)
	// 	return () => clearInterval(intervalId)
	// }, [refresh])

	const story = loadable.state === 'hasValue' ? loadable.contents : null

	React.useEffect(() => {
		if (story) {
			console.log('save opened story status')
			setOpenedStory(story.descendants || 0)
		}
	}, [setOpenedStory, story])
	
	if (loadable.state === 'hasError') {
		console.warn('story hasError', storyId)
		return <li>error</li>
	}

	if (loadable.state === 'loading')
		return <div id='StoryPage'>Loading...</div>

	if (!story) { 
		console.warn('no story', storyId)
		return null
	}
	
	return <div id='StoryPage'>

		<button onClick={() => setOpenStoryId(null)}>close</button>

		<p>story opened: {JSON.stringify(openedStory)}</p>

		<button onClick={() => refresh()}>refresh</button>

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