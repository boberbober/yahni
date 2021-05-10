
import React from 'react'
import { useRecoilValueLoadable } from 'recoil'

import { commentSelector } from '../utils/atoms'
import UserText from './UserText'
import Time from './Time'
import Symbol from './Symbol'


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
		return <div className='comment cDeleted'>
			<em>[deleted]</em>
		</div>

	return <div className='comment'>

		<p className='cHead'>
			<a className='cBy' href={`https://news.ycombinator.com/user?id=${comment.by}`}>
				{comment.by}
			</a>
			<a className='cUrl' href={`https://news.ycombinator.com/item?id=${id}`}>
				<Time time={comment.time} />
			</a>
			{ comment.kids &&
				<button className='cCollapse' onClick={handleToggle}>
					<Symbol id={ showKids ? 'up' : 'down' } />
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