
import React from 'react'
import { useSetRecoilState, useRecoilState } from 'recoil'

import { db } from '../utils/firebase'
import Comments from './Comments'
import Time from './Time'
import UserText from './UserText'

import { 
	openedStorySelector, 
	openStoryIdAtom, 
	storyAtom, 
} from '../utils/atoms'
import fetchItem from '../utils/fetchItem'



export default function StoryPage() {

	const [storyId, setOpenStoryId] = useRecoilState(openStoryIdAtom)
	const setOpenedStory = useSetRecoilState(openedStorySelector(storyId))
	const [story, setStory] = useRecoilState(storyAtom(storyId))

	// const refresh = useRecoilCallback(({ set }) => async (id) => {
	// 	console.log('refetch story', storyId, id)
	// 	const snap = await db.child(`item/${storyId}`).get()
	// 	const val = snap.val()
	// 	console.log(val)
	// 	set(storyItemSelector(storyId), val || null)
	// })

	// React.useEffect(() => {
	// 	const intervalId = setInterval(refresh, 2000)
	// 	return () => clearInterval(intervalId)
	// }, [refresh])

	// const story = loadable.state === 'hasValue' ? loadable.contents : null

	React.useEffect(() => {
		if (story === null)
			fetchItem(storyId, setStory)
	}, [story])


	React.useEffect(() => {
		if (story) {
			console.log('save opened story status')
			setOpenedStory(story.descendants || 0)
		}
	}, [setOpenedStory, story])
	
	// if (loadable.state === 'hasError') {
	// 	console.warn('story hasError', storyId)
	// 	return <li>error</li>
	// }

	// if (loadable.state === 'loading')
	// 	return <div id='StoryPage'>Loading...</div>

	if (!story) { 
		return <div id='StoryPage'>
			<p>Loading...</p>
		</div>
	}
	
	return <div id='StoryPage'>

		<button id='storyCloseButton'
			onClick={() => setOpenStoryId(null)}
		>
			close
		</button>

		{/* <p>story opened: {JSON.stringify(openedStory)}</p> */}

		{/* <button onClick={() => refresh()}>refresh</button> */}

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