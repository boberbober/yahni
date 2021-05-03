
import React from 'react'
import { useRecoilState } from 'recoil'
import produce from 'immer'

import { settingsAtom } from '../utils/atoms'


const THEMES = {
	default: { 
		name: 'Default',
	},
	hn: {
		name: 'HackerNews',
	},
	solarized: {
		name: 'Solarized',
	}
}

const DARKMODE = [
	['auto', 'auto'],
	['on', 'on'],
	['off', 'off'],
]


export default function Settings() {

	const [showSettings, setShowSettings] = React.useState(true)
	const [settings, setSettings] = useRecoilState(settingsAtom)

	const handleChange = ({ target }) => {
		setSettings(produce(settings, draft => {
			draft[target.name] = target.type === 'checkbox' ? target.checked : target.value
		}))
	}

	if (!showSettings)
		return null

	return <div id='Settings'>
		
		<label>
			<input type='checkbox'
				name='linkNewTab'
				checked={settings.linkNewTab}
				onChange={handleChange}
			/> open links in new tab
		</label>

		<label>
			<input type='checkbox'
				name='infiniteScroll'
				checked={settings.infiniteScroll}
				onChange={handleChange}
			/> enable infinite scroll
		</label>

		<h4>Theme</h4>

		{ Object.entries(THEMES).map(([id, { name }]) =>
			<label key={id}>
				<input type='radio'
					name='theme'
					value={id}
					checked={settings.theme === id}
					onChange={handleChange}
				/> { name }
			</label>
		)}

		<h4>Dark mode</h4>
		{ DARKMODE.map(([id, label]) =>
			<label key={id}>
				<input type='radio'
					name='darkMode'
					value={id}
					checked={settings.darkMode === id}
					onChange={handleChange}
				/> { label }
			</label>
		)}


	</div>
}
