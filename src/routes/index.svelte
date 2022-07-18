<script lang="ts">
	import Casing from "$lib/UI/PageContainers/Casing.svelte"
	import Grid from "svelte-grid"
	import gridHelp from "svelte-grid/build/helper/index.mjs"

	const { item } = gridHelp
	const imgs = [
		"showcase/09-1.jpg",
		"showcase/10.jpg",
		"showcase/11-3.jpg",
		"showcase/11-8.jpg",
		"showcase/11-11.jpg",
		"showcase/11-12.jpg"
	]
	let items = []
	const h = 4
	for (let i in imgs) {
		items.push({
			id: imgs[i],
			5: item({
				x: parseInt(i) % 5,
				y: Math.floor(parseInt(i) / 5) * h,
				w: 1,
				h: h
			}),
			3: item({
				x: parseInt(i) % 3,
				y: Math.floor(parseInt(i) / 3) * h,
				w: 1,
				h: h
			}),
			1: item({
				x: 0,
				y: Math.floor(parseInt(i)) * (h + 3),
				w: 1,
				h: h + 3
			})
		})
	}

	const cols = [
		[1100, 5],
		[800, 3],
		[500, 1]
	]
</script>

<Casing backBtn={false}>
	<div>
		<a href="https://haja-project.web.app/">Let's Do Together -- Today!</a>
	</div>
	<div class="size">
		<Grid bind:items rowHeight={100} let:item {cols} let:index>
			<img src={imgs[index]} alt="showcase image {imgs[index]}" />
		</Grid>
	</div>
</Casing>

<style>
	div {
		text-align: center;
	}
	a {
		font-size: 30px;
		color: var(--primary);
		text-decoration: none;
		font-weight: bold;
		transition: 0.3s ease;
	}
	img {
		max-height: 100%;
	}
	a:hover {
		text-decoration: underline;
	}
	.size {
		max-width: 1100px;
		width: 100%;
	}
</style>
