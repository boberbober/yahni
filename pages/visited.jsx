
import React from 'react'
import { useRecoilState, DefaultValue } from 'recoil'
import cn from 'classnames'

import Story from '../components/Story'

import { 
	openedStoriesAtom,
	visitedLinksAtom,
} from '../utils/atoms'


const WHICH = [
	['visited', 'Visited links'],
	['opened', 'Opened comments']
]


export default function VisitedPage() {

	const [openedStories, setOpenedStories] = useRecoilState(openedStoriesAtom)
	const [visitedLinks, setVisitedLinks] = useRecoilState(visitedLinksAtom)
	const [which, setWhich] = React.useState('visited')

	const handleClear = () => {
		switch (which) {
			case 'opened':
				return setOpenedStories(new DefaultValue)
			case 'visited':
				return setVisitedLinks(new DefaultValue)
		}
	}

	const stories = React.useMemo(() => {
		return Object.entries(which === 'visited' ? visitedLinks : openedStories).map(([storyId, info]) => storyId)
	}, [which])

	return <main id='VisitedMain'>

		<nav>
			{ WHICH.map(([id, label]) =>
				<button 
					onClick={() => setWhich(id)}
					className={cn('visitedNavLink', { selected: id === which })}
				>
					{ label }
				</button>
			)}
		</nav>

		<button onClick={handleClear}>clear all</button>

		<ul id='StoriesList'>
			{ stories.map(id => 
				<Story key={id} storyId={id} />
			)}
		</ul>

		{/* <pre>
			{ JSON.stringify(openedStories, null, 2)}
		</pre> */}
		
	</main>
}
