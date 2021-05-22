
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { settingsAtom, lastVisitAtom } from '../utils/atoms'


export default function SettingsUpdater() {

	const settings = useRecoilValue(settingsAtom)
	const setLastVisit = useSetRecoilState(lastVisitAtom)

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


	React.useEffect(() => {
		let lastVisit
		try {
			lastVisit = parseInt(localStorage.getItem('lastVisit'))
		} catch {}
		setLastVisit(lastVisit || null)
	}, [])
	
	return null
}
