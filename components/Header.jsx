
import React from 'react'
import Link from 'next/link'

import NavLink from './NavLink'
import Settings from './Settings'
import Symbol from './Symbol'
import Connection from './Connection'
import PAGES from '../utils/pages'


export default function Header() {

	const [showSettings, setShowSettings] = React.useState(false)

	return <header>
		
		<Link href='/'>
			<a id='logo' title='Yet Another Hacker News Interface'>
				YA<strong>HN</strong>I
			</a>
		</Link>

		<nav>
			{ Object.entries(PAGES).map(([id, { label, url }]) =>
				<NavLink href={`/${url}`} key={id}>
					<a>{label}</a>
				</NavLink>
			)} 
		</nav>

		<Connection />

		<Link href='/about'>
			<a id='aboutLink'>About</a>
		</Link>

		<button 
			id='settingsButton'
			onClick={() => setShowSettings(prev => !prev)}
		>
			<Symbol id='settings' /><span>Settings</span>
		</button>

		<div id='settingsHolder'>
			{ showSettings && 
				<Settings handleClose={() => setShowSettings(false)} /> }
		</div>

	</header>
}
