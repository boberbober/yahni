
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

	const updateStories = useRecoilCallback(({ snapshot, set }) => async updatedItems => {
		Promise.all(PAGES.map(page => snapshot.getPromise(storiesAtom(page[2]))))
			.then(pageStories => pageStories.flat())
			.then(allStories => {
				updatedItems.forEach(itemId => {
					if (allStories.includes(itemId)) {
						fetchItem(itemId, data => set(storyAtom(itemId), data))
					} else {
						fetchItem(itemId, data => set(commentAtom(itemId), data))
					}
				})
			})
	})

	const handleUpdate = React.useCallback(snap => {
		const updates = snap.val()
		if (!!updates?.items?.length)
			updateStories(updates.items)
	}, [dbConnected])

	React.useEffect(() => {
		if (!dbConnected || !db || !liveUpdates) 
			return
		db.child(`/updates`).on('value', handleUpdate)
		return () => db.child(`/updates`).off()
	}, [dbConnected, liveUpdates])

	return null
}
