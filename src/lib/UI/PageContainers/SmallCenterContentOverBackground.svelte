<script lang="ts">
	import Logo from "$lib/UI/Branding/Logo.svelte"
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,500;0,700;0,900;1,500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="container">
	<div class="logo">
		<Logo url={"/haja/logo_horizontal_white.png"} height={200} />
	</div>

	<slot />
</div>

<style>
	:global(body) {
		font-family: Roboto;
	}

	.container {
		display: flex;
		background-color: var(--bg);
		padding: 1rem 4rem 4rem 4rem;
		display: flex;
		height: 100vh;
		flex-direction: column;
		flex: 2;
		background-color: var(--primary);
		user-select: none;
		-webkit-user-select: none;
	}

	.logo {
		margin: 0 auto 0.5rem auto;
		width: 100%;
		max-width: 200px;
		max-height: 100%;
		text-align: center;
	}

	div {
		color: white;
	}
</style>
