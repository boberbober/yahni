
import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import { useSetRecoilState } from 'recoil'

import { dbConnectedAtom } from './atoms'

let db


function FirebaseProvider() {

	const setConnected = useSetRecoilState(dbConnectedAtom)

	const connectedListener = React.useCallback(snap => {
		console.log('.info/connected ', snap.val())
		setConnected(!!snap.val())
	}, [])

	React.useEffect(() => {
		if (!firebase.apps.length) {
			console.log('initializeApp')
			firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })
			firebase.database().ref('.info/connected').on('value', connectedListener)
			db = firebase.database().ref('/v0')
		}
	}, [])

	return null
}


export { FirebaseProvider, db }
