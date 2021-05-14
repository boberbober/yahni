
import React from 'react'
import { Helmet } from 'react-helmet'


export default function AboutPage() {
	return <main id='AboutPage'>

		<Helmet>
			<title>About</title>
		</Helmet>

		<h1>About</h1>

		<p>This <em>Yet Another HackerNews Interface</em> is built with <a href='https://nextjs.org'>Next.js</a>, hosted on <a href='https://vercel.com/'>Vercel</a>, pulls data directly from the <a href='https://github.com/HackerNews/API'>HackerNews Firebase API</a>, uses <a href='https://recoiljs.org'>Recoil</a> for state management, and will soon be open sourced.</p>

		<p>If you have any feature requests or find bugs please tweet me <a href='https://twitter.com/UnemploymentCEO'>@UnemploymentCEO</a>.</p>

		<p>If you really like this project and would like to support it:</p>

		<p>
			<a href="https://www.buymeacoffee.com/bober" target="_blank">
				<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height='40px' />
			</a>
		</p>

	</main>
}