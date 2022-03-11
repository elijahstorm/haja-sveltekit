<script lang="ts">
	import { goto } from '$app/navigation';

	import { signOut } from '$lib/firebase';
	import Icon from '@iconify/svelte';

	function login() {
		goto('login');
	}

	let user;
</script>

<section>
	{#if user}
		<div on:click={() => signOut()} class="button color primary">
			<span>Logout</span>
			<Icon icon={'fe:logout'} width={22} />
		</div>
	{:else}
		<div on:click={login} class="button color primary">
			<span>Login</span>
			<Icon icon={'akar-icons:google-fill'} width={22} />
		</div>
	{/if}
</section>

<style>
	section {
		margin: auto;
	}
	section > div {
		display: flex;
	}
	span {
		padding-right: calc(var(--default-padding) / 2);
		margin: auto;
		padding-top: 2px;
	}
	.button {
		border: 1px var(--text) solid;
		border-radius: var(--small-radius);
	}
</style>
