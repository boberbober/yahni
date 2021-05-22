
import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import { useSetRecoilState } from 'recoil'

import { dbConnectedAtom } from './atoms'


if (!firebase.apps.length)
	firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })

export const db = firebase.database().ref('/v0')


export function FirebaseUpdater() {

	const setConnected = useSetRecoilState(dbConnectedAtom)

	const connectedListener = React.useCallback(snap => setConnected(!!snap.val()), [])

	React.useEffect(() => {
		firebase.database().ref('.info/connected').on('value', connectedListener)
		return () => firebase.database().ref(`.info/connected`).off()
	}, [])

	return null
}
