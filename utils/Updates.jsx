
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
					fetchItem(itemId, data => 
						set(allStories.includes(itemId) 
							? storyAtom(itemId)
							: commentAtom(itemId)
						, data)
					)
				})
			})
	})

	// const handleUpdate = React.useCallback(snap => {
	// 	const updates = snap.val()
	// 	if (!!updates?.items?.length)
	// 		updateStories(updates.items)
	// }, [dbConnected])

	React.useEffect(() => {
		if (!dbConnected || !db || !liveUpdates) 
			return
		db.child(`/updates`).on('value', handleUpdate)
		return () => db.child(`/updates`).off()
	}, [dbConnected, liveUpdates])

	return null
}
