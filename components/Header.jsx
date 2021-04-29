
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

		<nav>

			YAHNI

			<ul>
				{ pages.map(([label, url]) =>
					<li key={label}>
						<NavLink href={`/${url}`}>
							<a>{label}</a>
						</NavLink>
					</li>
				)} 
			</ul>

		</nav>

		{ dbConnected ? 'connected' : 'not connected' }

	</header>
}
