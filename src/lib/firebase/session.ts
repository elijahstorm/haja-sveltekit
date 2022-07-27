import { writable } from "svelte/store"
import type { UserInfo } from "firebase/auth"

const session = writable<{
	user?: UserInfo
	ready: boolean
}>({
	user: null,
	ready: false
})

export default {
	subscribe: session.subscribe,
	set: session.set
}
