
import { db } from './firebase'

export default async function fetchItem(itemId, callback) {
	try {
		// console.log('fetchItem', itemId)
		const snap = await db.child(`item/${itemId}`).get()
		callback(snap.val())
	} catch (error) {
		console.warn("couldn't fetch item", itemId, error)
	}
}