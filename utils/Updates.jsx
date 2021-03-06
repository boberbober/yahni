
import React from 'react'
import { useRecoilValue, useRecoilCallback } from 'recoil'

import { db } from './firebase'
import fetchItem from './fetchItem'
import { 
	dbConnectedAtom, 
	storyAtom,
	commentAtom,
	polloptAtom,
	settingsAtom,
} from './atoms'


export default function Updates() {

	const dbConnected = useRecoilValue(dbConnectedAtom)
	const { liveUpdates } = useRecoilValue(settingsAtom)

	const handleUpdate = useRecoilCallback(({ set }) => async snap => {
		const update = snap.val()
		if (!update?.items?.length)
			return
		update.items.forEach(itemId =>
			fetchItem(itemId, data => 
				set(data.type === 'comment'
					? commentAtom(itemId)
					: data.type === 'pollopt'
					? polloptAtom(itemId)
					: storyAtom(itemId)
				, data)
			)
		)
	})
	// old version to update only shown stories (bad)
	// Promise.all(Object.entries(PAGES).map(([type]) => snapshot.getPromise(storiesAtom(type))))
	// 	.then(pageStories => pageStories.flat())
	// 	.then(allStories => {
	// 		update.items.forEach(itemId => {
	// 			// TODO: make this more efficient
	// 			// If an item is not in stories then it's (probably) a comment but updates can also be user items
	// 			fetchItem(itemId, data => 
	// 				set(allStories.includes(itemId) 
	// 					? storyAtom(itemId)
	// 					: commentAtom(itemId)
	// 				, data)
	// 			)
	// 		})
	// 	})

	React.useEffect(() => {
		if (!dbConnected || !db || !liveUpdates)
			return
		db.child(`/updates`).on('value', handleUpdate)
		return () => db.child(`/updates`).off()
	}, [dbConnected, liveUpdates])

	return null
}
