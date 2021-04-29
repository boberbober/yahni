
import React from 'react'
import { RecoilRoot } from 'recoil'

import { FirebaseProvider } from '../utils/firebase'
import Header from '../components/Header'

import '../styles/layout.sass'
import '../styles/stories.sass'

export default function AppWrap({ Component, pageProps }) {

	return <RecoilRoot>

		<FirebaseProvider />

		<Header />
		
		<Component {...pageProps} />

	</RecoilRoot>
}
