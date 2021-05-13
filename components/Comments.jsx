
import React from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import Comment from './Comment'


export default function Comments({ story }) {

	if (!story.kids)
		return null
	
	return <div id='StoryComments'>

		{ story.kids.map(id => <Comment key={id} commentId={id} /> )}

	</div>
}