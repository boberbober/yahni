
import React from 'react'
import { useRecoilState } from 'recoil'
import produce from 'immer'

import { settingsAtom, lastMaxItemSelector } from '../utils/atoms'


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


const STORYITEMS = [
	['score', 'score'],
	['comments', 'comments'],
	['date', 'date'],
	['user', 'user'],
	['domain', 'domain'],
]


export default function Settings() {

	const [showSettings, setShowSettings] = React.useState(true)
	const [settings, setSettings] = useRecoilState(settingsAtom)
	const [lastMaxItem, setLastMaxItem] = useRecoilState(lastMaxItemSelector)

	const handleChange = ({ target }) => {
		setSettings(produce(settings, draft => {
			draft[target.name] = target.type === 'checkbox' ? target.checked : target.value
		}))
	}

	const handleHideStoryItems = ({ target }) => {
		setSettings(produce(settings, draft => {
			draft.hideStoryItems[target.value] = !target.checked
		}))
	}

	if (!showSettings)
		return null

	return <div id='Settings'>
		
		<label>
			<input type='checkbox'
				name='liveUpdates'
				checked={settings.liveUpdates}
				onChange={handleChange}
			/> enable live updates
		</label>

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

		<h4>Show story list items</h4>
		{ STORYITEMS.map(([id, label]) =>
			<label key={id}>
				<input type='checkbox'
					name={`storyItems-${id}`}
					value={id}
					checked={!settings.hideStoryItems[id]}
					onChange={handleHideStoryItems}
				/> { label }
			</label>
		)}


		<input type='number'
			defaultValue={lastMaxItem}
			onBlur={event => {
				localStorage.setItem('lastMaxItem', parseInt(event.target.value))
			}}
		/>

	</div>
}
