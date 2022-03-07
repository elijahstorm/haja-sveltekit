<script lang="ts">
	import Header from './Header.svelte';
	export let backBtn: boolean = true;
</script>

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
		--card: #e2f2ff;
		--bg: #f8f9fa;
		--text: #000000;
		--canvas: #e6e4ef;
		--small-radius: 12px;
		--button-padding: 18px 14px;
		--short-transition: 0.3s;
		--default-padding: 24px;
	}

	:global(body) {
		background: var(--bg);
		font: 'Roboto';
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
	}
	:global(.text.primary) {
		color: var(--primary);
	}

	:global(.button.color.primary:hover) {
		color: var(--text);
		background-color: var(--primary-hl);
	}
</style>
