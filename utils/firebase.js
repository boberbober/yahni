
import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import { useSetRecoilState } from 'recoil'

import { dbConnectedAtom } from './atoms'

let db

const FirebaseContext = React.createContext(null)

function FirebaseProvider({ children }) {

	const setConnected = useSetRecoilState(dbConnectedAtom)

	function connectedListener(snap) {
		console.log('.info/connected ', snap.val())
		setConnected(!!snap.val())
	}

	if (typeof window !== 'undefined' && !firebase.apps.length) {
		firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })
		firebase.database().ref('.info/connected').on('value', connectedListener)
		db = firebase.database().ref('/v0')
	}

	return <FirebaseContext.Provider value={db}>
		{ children }
	</FirebaseContext.Provider>
}


export { FirebaseContext, FirebaseProvider, db }


// let db

// if (typeof window !== 'undefined' && !firebase.apps.length) {

// 	// firebase.initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG))	
	
// 	// if (process.env.NODE_ENV === 'development')
// 		// firebase.functions().useEmulator('localhost', 5001)

// 	firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })

// 	db = firebase.database().ref('/v0')

// 	const connectedRef = firebase.database().ref('.info/connected')
// 	connectedRef.on('value', connectedListener)

// 	// firebaseInstance = firebase
// }

// export default db


// export default function firebaseHelper() {

// 	const [isConnected, setConnected] = React.useState(false)
// 	const db = React.useRef(null)

// 	function connectedListener(snap) {
// 		console.log('.info/connected ', snap.val())
// 		setConnected(!!snap.val())
// 	}

// 	React.useEffect(() => {

// 		console.log('useFirebase useEffect')

// 		if (!firebase.apps.length) {
// 			console.log('firebase initializeApp')
// 			firebase.initializeApp({ databaseURL: 'https://hacker-news.firebaseio.com' })
// 			db.current = firebase.database().ref('/v0')
// 			const connectedRef = firebase.database().ref('.info/connected')
// 			connectedRef.on('value', connectedListener)
// 		}

// 	}, [])

// 	return [isConnected, db?.current]
// }
