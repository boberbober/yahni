
import React from 'react'
import { RecoilRoot } from 'recoil'
import Link from 'next/link'


export default function AppWrap({ Component, pageProps }) {

	console.log('AppWrap')

	return <RecoilRoot>

		<nav>
			YAHNI / 
			<Link href='/'>Top</Link> / 
			<Link href='/best'>Best</Link> / 
			<Link href='/new'>New</Link> / 
			<Link href='/ask'>Ask</Link> / 
			<Link href='/jobs'>Show</Link> / 
			<Link href='/jobs'>Jobs</Link>
		</nav>

		<Component {...pageProps} />

	</RecoilRoot>
}
