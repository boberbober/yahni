
import { db } from './firebase'
import { STORIES_PER_PAGE } from './config'



export default function getServerSidePropsGenerator(type) { return async function({ req }) {

	let stories = null
	let snippets = null
	
	// Next calls getServerSideProps on every route changed with <Link> and we don't need that.
	if (!req.url.startsWith('/_next')) {
		try {
		
			const snap = await db.child(`/${type}stories`).once('value')
			stories = snap.val()

			const snippetsToFetch = [...new Set([ 
				...stories.slice(0, STORIES_PER_PAGE), 
				...stories.slice().sort((a, b) => b - a).slice(0, STORIES_PER_PAGE)
			])]

			snippets = await Promise.all(snippetsToFetch.map(async storyId => {
				const snap = await db.child(`item/${storyId}`).get()
				return snap.val()
			}))

		} catch (error) { console.error(error) }
	}

	return {
		props: {
			type,
			stories,
			snippets,
		}
	}
}}
