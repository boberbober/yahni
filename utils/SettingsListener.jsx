
import React from 'react'
import { useRecoilValue } from 'recoil'

import { settingsAtom } from '../utils/atoms'


export default function SettingsProvider() {

	const settings = useRecoilValue(settingsAtom)

	React.useEffect(() => {

		const mql = window.matchMedia('(prefers-color-scheme: dark)')

		function setBodyTheme() {
			const colorScheme = settings.darkMode === 'auto'
				?	mql.matches ? 'dark' : 'light'
				:	settings.darkMode === 'on' ? 'dark' : 'light'
			document.body.dataset.theme = `${settings.theme}-${colorScheme}`
		}
		
		setBodyTheme()
		
		mql.addEventListener('change', setBodyTheme)

		return () => mql.removeEventListener('change', setBodyTheme)

	}, [settings.theme, settings.darkMode])
	
	return null
}
