
import React from 'react'
import { RecoilRoot } from 'recoil'
import { Helmet } from 'react-helmet'

import { FirebaseProvider } from '../utils/firebase'
import UserData from '../utils/UserData'
import Updates from '../utils/Updates'
import Sprite from '../utils/Sprite'
import Header from '../components/Header'
import SettingsProvider from '../utils/SettingsProvider'

import '../styles/layout.sass'


export default function AppWrap({ Component, pageProps }) {

	return <RecoilRoot>

		<Helmet defer={false}>
			<meta name='color-scheme' content='light dark' />
			<title>YAHNI</title>
		</Helmet>

		<FirebaseProvider />
		<SettingsProvider />
		<Updates />
		<UserData />

		<Header />
		
		<Component {...pageProps} />

		<Sprite />

	</RecoilRoot>
}
