<script lang="ts">
	import Casing from "$lib/UI/PageContainers/Casing.svelte"
	import Grid from "$lib/UI/Widgets/Grid.svelte"
	import Modal from "$lib/UI/Widgets/Modal.svelte"

	const imgs = [
		"showcase/09-1.jpg",
		"showcase/10.jpg",
		"showcase/11-3.jpg",
		"showcase/11-8.jpg",
		"showcase/11-11.jpg",
		"showcase/11-12.jpg"
	]

	const cols = 3
	const gap = "2rem 1rem"
</script>

<Casing logoLink={"/demo"} backBtn={false}>
	<div>
		<a href="https://haja-project.web.app/">Let's Do Together -- Today!</a>
	</div>
	<div>
		<Grid {cols} {gap} items={imgs} let:item let:index>
			<Modal caption={item}>
				<img src={item} alt="showcase image {index}" />
			</Modal>
		</Grid>
	</div>
</Casing>

<style>
	div {
		text-align: center;
		margin: 1rem 0;
		padding: 0.5rem 0;
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
</style>
