
import React from 'react'
import { useRecoilValue } from 'recoil'
import cn from 'classnames'

import Symbol from './Symbol'

import { 
	dbConnectedAtom,
	settingsAtom
} from '../utils/atoms'


export default function Connection() {

	const dbConnected = useRecoilValue(dbConnectedAtom)
	const { liveUpdates } = useRecoilValue(settingsAtom)

	return <div id='Connection'>

		<Symbol id='online' 
			className={cn('connOnline', {
				connConnecting: dbConnected === null,
				connConnected: dbConnected === true,
				connDisconnected: dbConnected === false,
				connLive: liveUpdates,
			})}
		/>

		<div id='connTooltip'>

			<span id='connStatus'>
				{ dbConnected === null && 'connecting...' }
				{ dbConnected === true && 'connected' }
				{ dbConnected === false && 'disconnected' }
			</span>

			{ (dbConnected && liveUpdates) &&
				<span id='connLiveStatus'>live updates</span> }

		</div>

	</div>
}
