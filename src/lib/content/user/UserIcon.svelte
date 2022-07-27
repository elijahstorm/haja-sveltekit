<script lang="ts">
	import { browser } from "$app/env"
	import { goto } from "$app/navigation"
	import session from "$lib/firebase/session"
	import FallbackImage from "$lib/UI/Widgets/FallbackImage.svelte"
	import type { UserInfo } from "firebase/auth"
	import type { UserContentConfig } from "./UserContent"

	export let user: UserContentConfig | null = null
	export let size: number = 2

	const myHome = () => {
		if (browser) goto(href)
	}

	let loggedIn: UserInfo
	session.subscribe(async ({ user, ready }) => {
		loggedIn = user
	})

	const href = user ? `/user/${user.id}` : "/me"
	const style = `width: ${size}rem; height: ${size}rem;`
</script>

<div on:click={myHome} class="profile" {style}>
	<FallbackImage
		src={user?.picture ?? loggedIn.photoURL}
		alt="user profile"
		fallback="/icon/person.svg"
	/>
</div>

<style>
	.profile {
		border-radius: 50%;
		border: 1px #555 solid;
		overflow: hidden;
		align-self: center;
		cursor: pointer;
		height: 2rem;
		width: 2rem;
		background: var(--bg);
	}
</style>
