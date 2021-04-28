
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


function StoryDetails({ id }) {
	const data = useRecoilValue(storyItemSelector(id))
	// return JSON.stringify(data)
	return <>
	
		[{ data.score }]

		<a href={data.url}>
			{ data.title }
		</a>

		<br />

		by { data.by } -  
		
		{ dayjs.unix(data.time).fromNow() } - 
		
		{ data.descendants } comments - 
		
		{ data.url }

	</>
}


export default function Story({ id }) {

	return <li>

		<React.Suspense fallback={id}>
			<StoryDetails id={id} />
		</React.Suspense>

	</li>
}