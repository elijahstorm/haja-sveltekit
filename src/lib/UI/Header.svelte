<script lang="ts">
	import { goto } from '$app/navigation';
	import BackButton from '$lib/UI/BackButton.svelte';
	import Login from '$lib/UI/Login.svelte';
	export let backBtn: boolean = true;
	const logo = 'haja/logo_horizontal_full.png';
</script>

<div class="flex">
	{#if backBtn}
		<BackButton />
	{/if}
	<img src={logo} alt="HAJA" on:click={() => goto('/')} />
	<div class="center" />
	<Login />
</div>

<style>
	img {
		max-width: 120px;
		cursor: pointer;
	}
	.flex {
		display: flex;
		flex-direction: horizontal;
	}
	.center {
		flex: 1;
	}
</style>
