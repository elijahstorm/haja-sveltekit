<script lang="ts">
	import { browser } from "$app/env"
	import { goto } from "$app/navigation"
	import UserIcon from "$lib/content/user/UserIcon.svelte"
	import { signOut } from "$lib/firebase/firebase"
	import session from "$lib/firebase/session"
	import type { UserInfo } from "firebase/auth"
	import "iconify-icon"

	const login = () => {
		if (browser) goto("/login")
	}

	let loggedIn: UserInfo
	session.subscribe(async ({ user, ready }) => {
		loggedIn = user
	})
</script>

<section>
	{#if loggedIn}
		<UserIcon />
		<div on:click={() => signOut()} class="button color primary">
			<span>Logout</span>
			<iconify-icon icon={"fe:logout"} width={22} />
		</div>
	{:else}
		<div on:click={login} class="button color primary">
			<span>Login</span>
			<iconify-icon icon={"akar-icons:google-fill"} width={22} />
		</div>
	{/if}
</section>

<style>
	section {
		margin: auto;
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}
	section > div {
		display: flex;
		height: max-content;
	}
	span {
		padding-right: calc(var(--default-padding) / 2);
		padding-top: 2px;
	}
	section > div > * {
		align-self: center;
	}
	.button {
		border: 1px #555 solid;
		border-radius: var(--small-radius);
	}
</style>
