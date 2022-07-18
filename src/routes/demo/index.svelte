<script lang="ts">
	import { goto } from "$app/navigation"

	const firstImage = "/showcase/01-1.jpg"
	const secondImage = "/showcase/01-2.jpg"

	let first, second
	const next = () => {
		first.style.opacity = 0
		second.style.opacity = 1
		setTimeout(() => {
			first.style.display = "none"
		}, 500)
	}
	const end = () => {
		goto("/")
	}
</script>

<div class="second" bind:this={second}>
	<img on:click={end} src={secondImage} alt="Welcome to HAJA" />
</div>
<div class="first" bind:this={first}>
	<img on:click={next} src={firstImage} alt="Welcome to HAJA" />
</div>

<style>
	div > img,
	div {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		transition: 0.5s;
	}
	.second {
		opacity: 0;
	}
</style>
