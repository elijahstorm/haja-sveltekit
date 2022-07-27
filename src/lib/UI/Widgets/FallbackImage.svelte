<script lang="ts">
	export let fallback: string = "/404.png"
	export let src: string | undefined
	export let alt: string

	const handleError = (e) => (e.target.src = fallback)
</script>

<img {src} {alt} on:error={handleError} />

<style>
	img {
		width: 100%;
		height: 100%;
	}
</style>
