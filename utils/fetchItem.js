
import { db } from './firebase'

export default async function fetchItem(itemId, callback) {
	try {
		const snap = await db.child(`item/${itemId}`).get()
		callback(snap.val())
	} catch (error) {
		console.warn(error)
		callback(null)
	}
}