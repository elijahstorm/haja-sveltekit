import { writable } from "svelte/store"

export const recentRequests = writable<number>(0)
