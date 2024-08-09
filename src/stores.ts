import { writable } from "svelte/store"
import { getAuth, onAuthStateChanged, type User } from "firebase/auth"
import { app } from './lib/firebase/firebase'

const auth = getAuth(app)
const user = writable<User | null> (null)

onAuthStateChanged(auth, (currentUser) => {
    user.set(currentUser)
})

export { user }