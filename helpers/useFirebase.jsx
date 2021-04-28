
import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'


export default function useFirebase() {

	const [isConnected, setConnected] = React.useState(false)
	const db = React.useRef(null)

	function connectedListener(snap) {
		console.log('.info/connected ', snap.val())
		setConnected(!!snap.val())
	}

	React.useEffect(() => {

		console.log('useFirebase useEffect')

		if (!firebase.apps.length) {
			console.log('firebase initializeApp')
			firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })
			db.current = firebase.database().ref('/v0')
			const connectedRef = firebase.database().ref('.info/connected')
			connectedRef.on('value', connectedListener)
		}

	}, [])

	return [isConnected, db?.current]
}
