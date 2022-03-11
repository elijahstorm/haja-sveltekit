<script lang="ts">
	import Header from '$lib/UI/Header.svelte';
	export let backBtn: boolean = true;
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,500;0,700;0,900;1,500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="container">
	<Header {backBtn} />
	<div class="padding-bottom" />
	<slot />
</div>

<style>
	:global(body) {
		font-family: Roboto;
	}

	.container {
		max-width: 900px;
		padding: 64px 184px;
	}
	.padding-bottom {
		padding-bottom: var(--default-padding);
	}

	@media only screen and (max-width: 800px) {
		.container {
			padding: 64px 7%;
		}
	}
</style>
