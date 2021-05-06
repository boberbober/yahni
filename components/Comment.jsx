
import React from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { commentSelector } from '../utils/atoms'
import UserText from './UserText'
import Time from './Time'


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
				<Time time={comment.time} />
			</a>
			{ comment.kids &&
				<button onClick={handleToggle}>
					{ showKids ? "collapse" : "open" }		
				</button>
			}
		</p>

		<UserText text={comment.text} />
		
		{ (showKids && !!comment.kids) && 
			comment.kids.map(id =>
				<Comment key={id} id={id} />
			)
		}

	</div>
}