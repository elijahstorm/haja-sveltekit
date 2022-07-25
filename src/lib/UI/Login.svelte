<script lang="ts">
	import { goto } from "$app/navigation"
	import { signOut } from "$lib/firebase/firebase"
	import session from "$lib/firebase/session"
	import type { UserInfo } from "firebase/auth"
	import "iconify-icon"

	const login = () => {
		goto("/login")
	}

	const myHome = () => {
		goto("/me")
	}

	let loggedIn: UserInfo
	session.subscribe(async ({ user }) => {
		loggedIn = user
	})
</script>

<section>
	{#if loggedIn}
		<div on:click={myHome} class="profile">
			<img src={loggedIn.photoURL} alt="user profile" />
		</div>
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
	.profile {
		border-radius: 50%;
		border: 1px var(--text) solid;
		overflow: hidden;
		align-self: center;
		cursor: pointer;
	}
	img {
		height: 2rem;
	}
	span {
		padding-right: calc(var(--default-padding) / 2);
		padding-top: 2px;
	}
	section > div > * {
		align-self: center;
	}
	.button {
		border: 1px var(--text) solid;
		border-radius: var(--small-radius);
	}
</style>
