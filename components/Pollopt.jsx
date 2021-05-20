
import React from 'react'
import { useRecoilState } from 'recoil'

import UserText from './UserText'
import Time from './Time'
import Symbol from './Symbol'
import fetchItem from '../utils/fetchItem'

import { polloptAtom } from '../utils/atoms'


export default function Pollopt({ polloptId }) {

	const [pollopt, setPollopt] = useRecoilState(polloptAtom(polloptId))

	React.useEffect(() => {
		if (pollopt === null)
			fetchItem(polloptId, setPollopt)
	}, [pollopt])

	if (!pollopt) {
		return <div className='pollopt cLoading'>
			<em className='loading'>Loading...</em>
		</div>
	}

	return <li className='pollopt'>

		<UserText text={pollopt.text} />

		<p className='polloptScore'>
			{pollopt.score} { pollopt.score === 1 ? "point" : "points" }
		</p>

	</li>
}