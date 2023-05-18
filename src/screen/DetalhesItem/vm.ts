import { set, ref, database, get, child, auth } from '../../Service/firebaseConfig'
import { getData } from '../../Service/asyncStorage'
import { Item } from '../../Service/interfaces'
import { useCallback, useState } from 'react'

class vm {
	item

	setItem(nomItem){
		this.item = nomItem
	}

	pegaDados() {
		useCallback(() => {
			const uid = auth.currentUser.uid
			const starCountRef = ref(database)
			get(child(starCountRef, `estoques/${uid}/${this.item}`))
				.then((snapshot) => {
					return snapshot.val()
				})
				.catch(console.log)
		}, [this.item])
	}
}

export { vm, Item }
