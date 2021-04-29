
import React from 'react'
import { useRecoilValue } from 'recoil'

import { dbConnectedAtom } from '../utils/atoms'
import NavLink from '../utils/NavLink'


const pages = [
	['Top', ''],
	['Best', 'best'],
	['New', 'new'],
	['Ask', 'ask'],
	['Show', 'show'],
	['Jobs', 'jobs'],
]


export default function Stories({ type }) {

	const dbConnected = useRecoilValue(dbConnectedAtom)

	return <header>
		
			<span id='logo'>YAHNI</span>

			<nav>
				{ pages.map(([label, url]) =>
					<NavLink href={`/${url}`} key={label}>
						<a>{label}</a>
					</NavLink>
				)} 
			</nav>

		{ dbConnected ? 'connected' : 'not connected' }

	</header>
}
