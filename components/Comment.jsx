
import React from 'react'
import { useRecoilState } from 'recoil'

import UserText from './UserText'
import Time from './Time'
import Symbol from './Symbol'
import fetchItem from '../utils/fetchItem'
import { commentAtom } from '../utils/atoms'


export default function Comment({ commentId }) {

	const [comment, setComment] = useRecoilState(commentAtom(commentId))
	const [showKids, setShowKids] = React.useState(true)

	React.useEffect(() => {
		if (comment === null)
			fetchItem(commentId, setComment)
	}, [comment])

	// if (loadable.state === 'loading')
	// 	return 'loading...'

	// if (loadable.state === 'hasError') {
	// 	console.warn('comment hasError', commentId)
	// 	return <li>error</li>
	// }

	// const comment = loadable.contents  

	// if (!comment) { 
	// 	console.warn('no comment', id)
	// 	return <p>no comment {id}</p>
	// }

	if (!comment)
		return <div className='comment cLoading'><em>Loading...</em></div>

	if (comment.deleted)
		return <div className='comment cDeleted'>
			<em>[deleted]</em>
		</div>

	return <div className='comment'>

		<p className='cHead'>
			<a className='cBy' href={`https://news.ycombinator.com/user?id=${comment.by}`}>
				{comment.by}
			</a>
			<a className='cUrl' href={`https://news.ycombinator.com/item?id=${commentId}`}>
				<Time time={comment.time} />
			</a>
			{ comment.kids &&
				<button className='cCollapse' 
					onClick={() => setShowKids(prev => !prev)}
				>
					<Symbol id={ showKids ? 'up' : 'down' } />
				</button>
			}
		</p>

		<UserText text={comment.text} />
		
		{ (showKids && !!comment.kids) && 
			comment.kids.map(id => <Comment key={id} commentId={id} /> )
		}

	</div>
}