
import React from 'react'
import { RecoilRoot } from 'recoil'
import { Helmet } from 'react-helmet'

import { FirebaseProvider } from '../utils/firebase'
import Updates from '../utils/Updates'
import Sprite from '../utils/Sprite'
import Header from '../components/Header'
import SettingsProvider from '../utils/SettingsProvider'

import '../styles/layout.sass'


export default function AppWrap({ Component, pageProps }) {

	return <RecoilRoot>

		<Helmet 
			defer={false}
			defaultTitle="Yet Another Hacker News Interface"
			titleTemplate="%s - Yet Another Hacker News Interface"
		>
			<meta name='color-scheme' content='light dark' />
			<meta name="description" content="An unofficial alternative Hacker News interface with live updates, comments, and dark mode. Movile friendly." />
			<link rel="icon" href="/favicon.svg" />
		</Helmet>

		<FirebaseProvider />
		<SettingsProvider />
		<Updates />

		<Header />
		<Component {...pageProps} />

		<Sprite />

	</RecoilRoot>
}
