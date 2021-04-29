
import React from 'react'
import { useRecoilValue } from 'recoil'

import { dbConnectedAtom } from './atoms'
import { db } from '../utils/firebase'


export default function UserData() {

	const dbConnected = useRecoilValue(dbConnectedAtom)

	const setMaxItem = async () => {
		try {
			const maxitem = await db.child('/maxitem').once('value')
			console.log('maxitem', maxitem.val())
			localStorage.setItem('lastMaxItem', maxitem.val())
		} catch (error) {
			console.error(error)
		}
	}
	
	React.useEffect(() => {
		
		console.log('UserData effect')

		if (dbConnected) {
			setMaxItem()
		}

	}, [dbConnected])
	
	return null
}