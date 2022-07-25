<script context="module" lang="ts">
	export async function load({ session }) {
		if (session.user) {
			return {
				status: 302,
				redirect: "/"
			}
		}
		return {}
	}
</script>

<script lang="ts">
	import { loginWithInfo, loginWithGoogle } from "$lib/firebase/firebase"
	import "iconify-icon"
	import { onMount } from "svelte"

	export let shadow = false

	$: shrunk = true
	$: attempted = false

	onMount(() => {
		shrunk = false
	})

	let email: string = ""
	let password: string = ""
	$: errorReport = null

	const submit = async (e) => {
		const { user, error } = await loginWithInfo(email, password)
		errorReport = error
		attempted = true

		console.log(errorReport)
	}

	const google = async (e) => {
		const { user, error } = await loginWithGoogle()
	}
</script>

<section class:shrunk class:shadow>
	<form class:attempted on:submit|preventDefault={submit}>
		<div class="container">
			<div class="header">
				<span> Login to </span>

				<img class="logo" src="/haja/logo_horizontal_full.png" alt="haja" />
			</div>

			{#if errorReport}
				<div class="error">
					{errorReport}
				</div>
			{/if}

			<label for="email"><b>Email</b></label>
			<input type="email" placeholder="Email" required bind:value={email} />

			<label for="psw"><b>Password</b></label>
			<input type="password" placeholder="Password" required bind:value={password} />

			<button type="submit">Login</button>

			<div class="providers">
				<div>
					<iconify-icon icon="akar-icons:google-fill" width={22} />
				</div>
			</div>

			<p class="help">
				Help finding your
				<a href="/login/help/lost-email">an ID</a>
				or
				<a href="/login/help/forgot-password">password</a>
			</p>
		</div>
	</form>
</section>

<style>
	section {
		transition: 0.6s;
	}
	.shadow {
		box-shadow: 0px 9px 20px 8px rgb(0 0 0 / 12%);
	}
	.shrunk {
		transform: scale(0);
	}
	* {
		letter-spacing: 0px;
	}

	input[type="email"],
	input[type="password"] {
		width: 100%;
		padding: 0.5rem 1rem;
		margin: 0.5rem 0 1rem 0;
		display: inline-block;
		border: 0;
		background-color: var(--bg);
		box-sizing: border-box;
		border-radius: 3rem;
		transition: 0.3s;
		/* box-shadow: 0px 0px 1px 1px #0000004a; */
		background-color: #00000013;
	}
	input:focus {
		border: 0;
		box-shadow: 0px 0px 2px 2px var(--primary-hl);
		outline: none;
	}
	.attempted > * > input:invalid {
		box-shadow: 0px 0px 1px 1px var(--error);
	}

	button {
		background-color: var(--primary);
		color: white;
		padding: 0.8rem 20px;
		margin: 34px 0 12px 0;
		text-transform: uppercase;
		font-weight: bold;
		line-height: 1.5rem;
		border: none;
		cursor: pointer;
		width: 100%;
		border-radius: 3rem;
		transition: 0.3s;
		box-shadow: 0px 6px 7px 2px var(--primary-o);
	}

	button:hover {
		opacity: 0.8;
	}

	.container {
		padding: 1rem;
	}

	.error {
		color: red;
	}

	.providers {
		display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 2rem;
		margin: 1rem 0;
	}
	.providers > * {
		border-radius: 50%;
		border: 1px solid #555;
		padding: 0.5rem;
	}

	.help {
		margin-top: 1rem;
		font-weight: 300;
	}
	.help > a {
		color: var(--primary);
		text-decoration: none;
		border-bottom: 1px solid;
		border-bottom-color: var(--transparent);
		transition: border-bottom-color 0.3s;
	}
	.help > a:hover {
		border-bottom-color: var(--primary);
	}

	.header {
		margin: 1rem 0 3rem 0;
		font-size: 20px;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}
	.header > * {
		align-self: center;
	}

	.logo {
		width: 6rem;
	}

	form {
		background-color: var(--bg);
	}
</style>
