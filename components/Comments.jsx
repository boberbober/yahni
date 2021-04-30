
import React from 'react'
import { selectorFamily, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import cn from 'classnames'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { lastMaxItemSelector, openStoryIdAtom, storyItemSelector } from '../utils/atoms'
import Comment from './Comment'

const cleanUrl = url => url.replace(/^(https?:\/\/(www\.)?)|(\/.*$)/g, '')


export default function Comments({ story }) {

	// const loadable = useRecoilValueLoadable(storyItemSelector(storyId))

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