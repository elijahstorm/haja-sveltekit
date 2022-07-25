import { writable } from "svelte/store"
import type { UserInfo } from "firebase/auth"

const session = writable<{
	user?: UserInfo
}>({
	user: null
})

export default {
	subscribe: session.subscribe,
	set: session.set
}
