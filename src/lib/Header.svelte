<script lang="ts">
	import logo from '$lib/images/haja logo_horizontal_full.png';
	import { goto } from '$app/navigation';
	import BackButton from './BackButton.svelte';
	import Login from './Login.svelte';
	export let backBtn: boolean = true;
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
