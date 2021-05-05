
import React from 'react'
import { useRecoilState } from 'recoil'

// import Stories from '../components/Stories'

import { 
	openedStoriesAtom,
} from '../utils/atoms'


export default function OpenedStoriesPage() {

	const [openedStories, setOpenedStories] = useRecoilState(openedStoriesAtom)


	return <main>

		<h1>Opened stories</h1>

		<pre>
			{ JSON.stringify(openedStories, null, 2)}
		</pre>
		
	</main>
}
