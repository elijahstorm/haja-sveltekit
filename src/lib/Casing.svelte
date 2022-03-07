<script lang="ts">
	import Header from './Header.svelte';
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
	:global(:root) {
		--primary: #41a7fa;
		--primary-hl: #6abcff;
		--secondary: #60dfcd;
		--error: #ff0000;
		--card: #e2f2ff;
		--bg: #f8f9fa;
		--text: #000000;
		--canvas: #e6e4ef;
		--small-radius: 12px;
		--button-padding: 10px 16px;
		--short-transition: 0.3s;
		--default-padding: 24px;
	}

	@font-face {
		font-family: Roboto;
		src: url(src/lib/fonts/Roboto/Roboto-Medium.ttf);
		font-style: sans-serif;
		font-weight: 500;
	}
	@font-face {
		font-family: NotoSansKR;
		src: url(src/lib/fonts/Noto_Sans_KR/NotoSansKR-Medium.otf);
		font-style: sans-serif;
		font-weight: 500;
	}

	:global(body) {
		background: var(--bg);
		color: var(--text);
		letter-spacing: 0.6px;
		font-family: Roboto;
		/* font-family: Noto Sans KR; */
	}

	:global(img) {
		width: 100%;
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

	:global(.button) {
		cursor: pointer;
		user-select: none;
		font-weight: bold;
		text-transform: uppercase;
		padding: var(--button-padding);
		transition: var(--short-transition);
		box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 20%);
	}

	:global(.button:hover) {
		box-shadow: 0 8px 10px 0 rgb(0, 0, 0, 30%);
	}

	:global(.color.primary) {
		background-color: var(--primary);
		color: var(--bg);
	}
	:global(.text.primary) {
		color: var(--primary);
	}

	:global(.button.color.primary:hover) {
		color: var(--text);
		background-color: var(--primary-hl);
	}
</style>
