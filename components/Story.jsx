
import React from 'react'
import { selectorFamily, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { db } from '../utils/firebase'
import { lastMaxItemSelector } from '../utils/atoms'


const storyItemSelector = selectorFamily({
	key: 'storyItem',
	get: storyId => async () => {
		try {
			const snap = await db.child(`item/${storyId}`).get()
			return snap.val()
		} catch (error) {
			console.error(error)
			return null
		}
	}
})

const cleanUrl = url => url.replace(/^(https?:\/\/(www\.)?)|(\/.*$)/g, '')


export default function Story({ id }) {

	// const lastMaxItem = useRecoilValue(lastMaxItemSelector)
	const loadable = useRecoilValueLoadable(storyItemSelector(id))
	
	if (loadable.state === 'loading')
		return <li>loading #{ id }</li>

	if (loadable.state === 'hasError')
		return <li>error</li>

	const story = loadable.contents  

	if (!story) 
		return null

	return <li className={`story s-${story.type}`}>

		<a href={story.url ?? `https://news.ycombinator.com/item?id=${id}`} className='sLink'>
			<span className='sTitle'>{ story.title }</span>
			{ story.url &&
				<small className='sUrl'>{ cleanUrl(story.url) }</small> }
		</a>

		{ story.type !== 'job' &&  <>

			<span className='sScore'>
				{ story.score }
			</span>

			<span className='sComments'>
				{ story.descendants }
			</span>

		</>}

		<p className='sSub'>
			<span className='sDate'>
				{ dayjs.unix(story.time).fromNow() }
			</span> by <span className='sBy'>
				{ story.by }
			</span>
		</p>

	</li>
}