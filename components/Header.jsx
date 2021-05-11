
import React from 'react'
import { useRecoilValue } from 'recoil'
import Link from 'next/link'

import NavLink from './NavLink'
import Settings from './Settings'
import Symbol from './Symbol'
import PAGES from '../utils/pages'
import { dbConnectedAtom } from '../utils/atoms'


export default function Header() {

	const dbConnected = useRecoilValue(dbConnectedAtom)
	const [showSettings, setShowSettings] = React.useState(false)

	return <header>
		
		<Link href='/'>
			<a id='logo'>YA<strong>HN</strong>I</a>
		</Link>

		<nav>
			{ PAGES.map(([label, url]) =>
				<NavLink href={`/${url}`} key={label}>
					<a>{label}</a>
				</NavLink>
			)} 
		</nav>

		<span id='dbConnected'>
			{ dbConnected ? 'connected' : 'not connected' }
		</span>

		<Link href='/about'>
			<a>About</a>
		</Link>

		<button 
			id='settingsButton'
			onClick={() => setShowSettings(prev => !prev)}
		>
			<Symbol id='settings' /><span>Settings</span>
		</button>

		{ showSettings && <Settings /> }

	</header>
}
