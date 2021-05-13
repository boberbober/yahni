
import React from 'react'
import { useRecoilState } from 'recoil'
import produce from 'immer'

import { settingsAtom } from '../utils/atoms'


const THEMES = [
	['hn', 'HackerNews'],
	['solarized', 'Solarized']
]

const DARKMODE = [
	['auto', 'auto'],
	['on', 'on'],
	['off', 'off'],
]

const STORYITEMS = [
	['score', 'score'],
	['comments', 'comment count'],
	['domain', 'url domain'],
	['date', 'date'],
	['user', 'author'],
]


export default function Settings({ handleClose }) {

	const [settings, setSettings] = useRecoilState(settingsAtom)
	const ref = React.useRef(null)

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

	React.useEffect(() => {
		function handleClick(event) {
			if (!ref.current?.contains(event.target))
				handleClose()
		}
		window.addEventListener('click', handleClick)
		return () => window.removeEventListener('click', handleClick)
	}, [handleClose])

	return <div id='Settings' ref={ref}>
		
		<div className='setField'>
			<label>
				<input type='checkbox'
					name='liveUpdates'
					checked={settings.liveUpdates}
					onChange={handleChange}
				/> Enable live updates
			</label>
			<p className='setDesc'>
				New stories, comments, and scores will appear without refreshing the page
			</p>
		</div>

		<div className='setField'>
			<label>
				<input type='checkbox'
					name='linkNewTab'
					checked={settings.linkNewTab}
					onChange={handleChange}
				/> Open links in new tab
			</label>
		</div>
		
		<div className='setField'>
			<label>
				<input type='checkbox'
					name='infiniteScroll'
					checked={settings.infiniteScroll}
					onChange={handleChange}
				/> Enable infinite scroll
			</label>
		</div>

		<div className='setField'>
			<h4>Dark mode:</h4>
			<div id='setDarkMode'>
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
		</div>

		<div className='setField'>
			<h4>Color theme:</h4>
			{ THEMES.map(([id, name]) =>
				<label key={id}>
					<input type='radio'
						name='theme'
						value={id}
						checked={settings.theme === id}
						onChange={handleChange}
					/> { name }
				</label>
			)}
			<p className='setDesc'>Each theme has dark and light version</p>
		</div>

		<div className='setField'>
			<h4>Show in stories list:</h4>
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
		</div>

	</div>
}
