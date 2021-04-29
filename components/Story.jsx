
import React from 'react'
import { selectorFamily, useRecoilValue } from 'recoil'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { db } from '../utils/firebase'


const storyItemSelector = selectorFamily({
	key: 'storyItem',
	get: storyId => async () => {
		const snap = await db.child(`item/${storyId}`).get()
		return snap.val()
	}
})

const cleanUrl = url => url.replace(/^(https?:\/\/(www\.)?)|(\/.*$)/g, '')


function StoryDetails({ id }) {

	const data = useRecoilValue(storyItemSelector(id))

	return <>

		<a href={data.url ?? `https://news.ycombinator.com/item?id=${id}`} className='sLink'>
			<span className='sTitle'>{ data.title }</span>
			{ data.url &&
				<small className='sUrl'>{ cleanUrl(data.url) }</small> }
		</a>	

		<span className='sScore'>
			{ data.score }
		</span>

		<span className='sComments'>
			{ data.descendants }
		</span>

		<p className='sSub'>
			<span className='sDate'>
				{ dayjs.unix(data.time).fromNow() }
			</span> by <span className='sBy'>
				{ data.by }
			</span>
		</p>
		
	</>
}


export default function Story({ id }) {

	return <li className='story'>

		<React.Suspense fallback={id}>
			<StoryDetails id={id} />
		</React.Suspense>

	</li>
}