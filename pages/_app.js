
import React from 'react'
import { RecoilRoot } from 'recoil'
import { Helmet } from 'react-helmet'

import { FirebaseProvider } from '../utils/firebase'
import UserData from '../utils/UserData'
import Header from '../components/Header'
import SettingsProvider from '../utils/SettingsProvider'

import '../styles/layout.sass'


export default function AppWrap({ Component, pageProps }) {

	return <RecoilRoot>

		<Helmet defer={false}>
			<title>YAHNI</title>
		</Helmet>

		<FirebaseProvider />
		<SettingsProvider />
		<UserData />

		<Header />
		
		<Component {...pageProps} />

	</RecoilRoot>
}
