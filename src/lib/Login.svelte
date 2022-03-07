<script lang="ts">
	import { googleLogin, signOut } from '$lib/firebase';
	import Icon from '@iconify/svelte';

	function login() {
		googleLogin();
	}

	let user;
</script>

<section>
	{#if user}
		<div on:click={() => signOut()} class="button color primary">
			<span>Logout</span>
			<Icon icon={'ion:exit-outline'} width={22} />
		</div>
	{:else}
		<div on:click={login} class="button color primary">
			<span>Login</span>
			<Icon icon={'akar-icons:google-fill'} width={22} />
		</div>
	{/if}
</section>

<style>
	section > div {
		display: flex;
	}
	span {
		padding-right: calc(var(--default-padding) / 2);
		margin: auto;
	}
	.button {
		border: 1px var(--text) solid;
		border-radius: var(--small-radius);
	}
</style>
