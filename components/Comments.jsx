
import React from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import Comment from './Comment'


export default function Comments({ story }) {

	if (!story.kids)
		return <p>
			<a href={`https://news.ycombinator.com/item?id=${story.id}`}>reply</a>
		</p>
	
	return <div id='StoryComments'>

		{ story.kids.map(id =>
			<Comment key={id} id={id} />
		)}

	</div>
}