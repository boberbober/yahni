
import React from 'react'
import { useRecoilValue, useRecoilCallback } from 'recoil'

import { db } from './firebase'

import { dbConnectedAtom, storyItemSelector } from './atoms'


export default function Updates() {

	const dbConnected = useRecoilValue(dbConnectedAtom)


	const updateStories = useRecoilCallback(({ snapshot, set }) => stories => {
		console.log('updateStories', stories)
		for (let storyId of stories) {
			snapshot.getLoadable(storyItemSelector(storyId))
		}
	})

	const handleUpdate = React.useCallback(snap => {
		const updates = snap.val()
		console.log('updates', updates)
		if (!!updates?.items?.length)
			updateStories(updates.items)
	}, [dbConnected])

	React.useEffect(() => {
		if (!dbConnected || !db) return
		db.child(`/updates`).on('value', handleUpdate)
		return () => db.child(`/updates`).off()
	}, [dbConnected])

	return null
}
