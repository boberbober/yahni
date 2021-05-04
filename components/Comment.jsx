
import React from 'react'
import { selectorFamily, useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil'
import cn from 'classnames'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import { commentSelector, lastMaxItemSelector, openStoryIdAtom, storyItemSelector } from '../utils/atoms'


function fixCommentHtml(text) {

	return text.replace(/(^|<p>|<i>)&gt; ?/g, '<p class="cQuot">').replace(/`(.+?)`/g, `<code>$1</code>`)
}


export default function Comment({ id }) {

	const loadable = useRecoilValueLoadable(commentSelector(id))
	const [showKids, setShowKids] = React.useState(true)

	const handleToggle = () => {
		setShowKids(prev => !prev)
	}

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

	if (comment.deleted)
		return <div className='comment'><em>[deleted]</em></div>

	return <div className='comment'>

		<p className='cHead'>
			<span className='cBy'>{comment.by}</span>
			<a className='cUrl' href={`https://news.ycombinator.com/item?id=${id}`}>
				{ dayjs.unix(comment.time).fromNow() }
			</a>
			{ comment.kids &&
				<button onClick={handleToggle}>
					{ showKids ? "collapse" : "open" }		
				</button>
			}
		</p>

		<div className='cText'
			dangerouslySetInnerHTML={{__html: fixCommentHtml(comment.text)}} 
		/>
		{/* <details>
			<summary>comment.text</summary>
			{comment.text}
		</details>
		<details>
			<summary>fixCommentHtml(comment.text)</summary>
			{fixCommentHtml(comment.text)}
		</details> */}

		{ (showKids && !!comment.kids) && 
			comment.kids.map(id =>
				<Comment key={id} id={id} />
			)
		}

	</div>
}