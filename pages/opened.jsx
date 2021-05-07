
import React from 'react'
import { useRecoilState, DefaultValue } from 'recoil'

// import Stories from '../components/Stories'

import { 
	openedStoriesAtom,
	visitedLinksAtom,
} from '../utils/atoms'


export default function OpenedStoriesPage() {

	const [openedStories, setOpenedStories] = useRecoilState(openedStoriesAtom)
	const [visitedLinks, setVisitedLinks] = useRecoilState(visitedLinksAtom)


	return <main>

		<h1>Opened stories</h1>

		<button onClick={() => setOpenedStories(new DefaultValue)}>clear</button>

		<pre>
			{ JSON.stringify(openedStories, null, 2)}
		</pre>
		
		<h1>Visited links</h1>
		<button onClick={() => setVisitedLinks(new DefaultValue)}>clear</button>


		<pre>
			{ JSON.stringify(visitedLinks, null, 2)}
		</pre>
		
	</main>
}
