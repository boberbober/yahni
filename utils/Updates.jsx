
import React from 'react'
import { useRecoilValue, useRecoilCallback } from 'recoil'

import PAGES from './pages'
import { db } from './firebase'
import fetchItem from './fetchItem'
import { 
	dbConnectedAtom, 
	storiesAtom,
	storyAtom,
	commentAtom,
	settingsAtom,
} from './atoms'


export default function Updates() {

	const dbConnected = useRecoilValue(dbConnectedAtom)
	const { liveUpdates } = useRecoilValue(settingsAtom)

	const handleUpdate = useRecoilCallback(({ snapshot, set }) => async snap => {
		
		const update = snap.val()
		if (!update?.items?.length)
			return
		
		Promise.all(Object.entries(PAGES).map(([type]) => snapshot.getPromise(storiesAtom(type))))
			.then(pageStories => pageStories.flat())
			.then(allStories => {
				update.items.forEach(itemId => {
					// TODO: make this more efficient
					// If an item is not in stories then it's (probably) a comment but updates can also be user items
					fetchItem(itemId, data => 
						set(allStories.includes(itemId) 
							? storyAtom(itemId)
							: commentAtom(itemId)
						, data)
					)
				})
			})
	})

	React.useEffect(() => {
		if (!dbConnected || !db || !liveUpdates)
			return
		db.child(`/updates`).on('value', handleUpdate)
		return () => db.child(`/updates`).off()
	}, [dbConnected, liveUpdates])

	return null
}
