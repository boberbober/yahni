
import React from 'react'
import { selectorFamily, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import cn from 'classnames'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { commentSelector, lastMaxItemSelector, openStoryIdAtom, storyItemSelector } from '../utils/atoms'


export default function Comment({ id }) {

	const loadable = useRecoilValueLoadable(commentSelector(id))

	if (loadable.state === 'loading')
		return 'loading...'

	if (loadable.state === 'hasError') {
		console.warn('comment hasError', id)
		return <li>error</li>
	}

	const comment = loadable.contents  

	if (!comment) { 
		console.warn('no comment', id)
		return <p>no comment {id}</p>
	}
	
	return <div className='comment'>

		<p>by {comment.by} { dayjs.unix(comment.time).fromNow() }</p>

		<div className='cText'
			dangerouslySetInnerHTML={{__html: comment.text}} 
		/>

		{ !!comment.kids && 
			comment.kids.map(id =>
				<Comment key={id} id={id} />
			)
		}

	</div>
}