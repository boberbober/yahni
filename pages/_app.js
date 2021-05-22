
import React from 'react'
import { RecoilRoot } from 'recoil'
import { Helmet } from 'react-helmet'

import { FirebaseUpdater } from '../utils/firebase'
import SettingsUpdater from '../utils/SettingsUpdater'
import Updates from '../utils/Updates'
import Sprite from '../utils/Sprite'
import Header from '../components/Header'

import '../styles/layout.sass'


import { 
	storiesAtom, 
	storyAtom, 
} from '../utils/atoms'


export default function AppWrap({ Component, pageProps }) {

	function initializeState({ set }) {
		
		if (!!pageProps.stories && pageProps.type)
			set(storiesAtom(pageProps.type), pageProps.stories)
		
		if (!!pageProps.snippets) {
			for (const snippet of pageProps.snippets) {
				set(storyAtom(snippet.id), snippet)
			}
		}
	}

	return <RecoilRoot initializeState={initializeState}>

		<Helmet 
			defer={false}
			defaultTitle="Yet Another Hacker News Interface"
			titleTemplate="%s - Yet Another Hacker News Interface"
		>
			<meta name='color-scheme' content='light dark' />
			<meta name='description' content="An unofficial alternative Hacker News interface with live updates, comments, and dark mode. Mobile friendly." />
			<link rel='icon' href='/favicon.svg' />
			<link rel='mask-icon' href='/favicon.svg' />
		</Helmet>

		<Header />
		<Component {...pageProps} />

		<Sprite />

		<FirebaseUpdater />
		<SettingsUpdater />
		<Updates />

	</RecoilRoot>
}
