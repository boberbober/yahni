
import React from 'react'
import { useRecoilValue } from 'recoil'
import Link from 'next/link'

import { dbConnectedAtom } from '../utils/atoms'
import NavLink from './NavLink'
import Settings from './Settings'

const pages = [
	['Top', ''],
	['Best', 'best'],
	['New', 'new'],
	['Ask', 'ask'],
	['Show', 'show'],
	['Jobs', 'jobs'],
]


export default function Header() {

	const dbConnected = useRecoilValue(dbConnectedAtom)
	const [showSettings, setShowSettings] = React.useState(false)

	return <header>
		
		<Link href='/'>
			<a id='logo'>YA<strong>HN</strong>I</a>
		</Link>

		<nav>
			{ pages.map(([label, url]) =>
				<NavLink href={`/${url}`} key={label}>
					<a>{label}</a>
				</NavLink>
			)} 

		</nav>

		<span id='dbConnected'>
			{ dbConnected ? 'connected' : 'not connected' }
		</span>

		<button onClick={() => setShowSettings(prev => !prev)}>settings</button>

		{ showSettings && <Settings /> }

	</header>
}
