<script lang="ts">
	import type { TeamContentConfig } from "./TeamContent"
	import { browser } from "$app/env"
	import { goto } from "$app/navigation"
	import UserIconList from "../user/UserIconList.svelte"
	import FallbackImage from "$lib/UI/Widgets/FallbackImage.svelte"

	export let team: TeamContentConfig | string

	const img404 = "/404.png"
	const { title, caption, picture, users } =
		typeof team === "string"
			? {
					title: "",
					caption: "",
					picture: img404,
					users: []
			  }
			: team
	const src = picture

	const view = () => {
		if (typeof team === "string") return

		if (browser) goto(`/team/${team.id}`)
	}
</script>

<div class="card" on:click={view}>
	<div class="grid">
		{#if typeof team !== "string"}
			<div class="background">
				<FallbackImage {src} alt={`team ${title}`} />
			</div>
			<p class="title bold">{title}</p>
			<p class="caption">{caption}</p>
			<div class="info">
				<UserIconList {users} hideMe />
				<p class="bold">
					{users.length}
				</p>
			</div>
		{:else}
			<div class="background">
				<img src={img404} alt="team not found" />
			</div>
			<p class="caption bold alert">Team not found</p>
		{/if}
	</div>
</div>

<style>
	.card {
		border-radius: 20px;
		overflow: hidden;
		border: 1px solid #555;
		cursor: pointer;
		background-image: linear-gradient(#0007, #0002, var(--bg), #0002, #0007);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		justify-content: space-between;
		align-content: space-between;
	}
	.background {
		aspect-ratio: 2 / 1;
		grid-column: 1 / 3;
		grid-row: 1 / 3;
		overflow: hidden;
	}
	p {
		padding: 1rem;
		color: var(--bg);
	}
	.bold {
		font-weight: bold;
	}
	.alert {
		color: red;
	}
	.title {
		grid-column: 1;
		grid-row: 2;
		align-self: flex-end;
	}
	.caption {
		grid-column: 1;
		grid-row: 1 / 3;
	}
	.info {
		grid-column: 2;
		grid-row: 2;
		align-self: flex-end;
		justify-self: flex-end;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-content: center;
	}
</style>
