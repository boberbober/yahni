
import React from 'react'
import { RecoilRoot } from 'recoil'

import { FirebaseProvider } from '../utils/firebase'
import UserData from '../utils/UserData'
import Header from '../components/Header'

import '../styles/layout.sass'
import '../styles/stories.sass'
import '../styles/story.sass'


export default function AppWrap({ Component, pageProps }) {

	return <RecoilRoot>

		<FirebaseProvider />
		<UserData />

		<Header />
		
		<Component {...pageProps} />

	</RecoilRoot>
}
