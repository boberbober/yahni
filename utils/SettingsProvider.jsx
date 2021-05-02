
import React from 'react'
import { useRecoilValue } from 'recoil'
import { Helmet } from 'react-helmet'

import { settingsAtom } from '../utils/atoms'


export default function SettingsProvider() {

	const settings = useRecoilValue(settingsAtom)

	let colorScheme = settings.darkMode === 'on' 
		? 'dark' 
		: settings.darkMode === 'off'
		? 'light'
		: 'light dark'
	
	return <Helmet>

		<meta name='color-scheme' content={colorScheme} />

		<title>{ colorScheme }</title>

		<style type='text/css'>{`

			:root {
				color-scheme: ${colorScheme};
			}
		
		`}</style>

	</Helmet>
}
