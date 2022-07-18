<script lang="ts">
	import { googleLogin } from "$lib/firebase"
	import { onMount } from "svelte"

	function loginWithGoogle() {
		googleLogin()
	}

	let section
	onMount(() => {
		section.classList.remove("shrunk")
	})

	let form

	function attempt() {
		form.classList.remove("unattempted")
	}
</script>

<section bind:this={section} class="shrunk">
	<form class="content unattempted" action="/action_page.php" method="post" bind:this={form}>
		<div class="container">
			<div class="header">
				<span> Login to </span>

				<img class="logo" src="/haja/logo_horizontal_full.png" alt="haja" />
			</div>
			<label for="uname"><b>Username</b></label>
			<input type="text" placeholder="Enter Username" name="uname" required />

			<label for="psw"><b>Password</b></label>
			<input type="password" placeholder="Enter Password" name="psw" required />

			<button on:click={attempt}>Login</button>

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
		/* box-shadow: 0px 9px 20px 8px rgb(0 0 0 / 12%); */
		transition: 0.6s;
	}
	.shrunk {
		transform: scale(0);
	}
	* {
		letter-spacing: 0px;
	}

	input[type="text"],
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
	:not(.unattempted) > * > input:invalid {
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

	.content {
		background-color: var(--bg);
	}
</style>
