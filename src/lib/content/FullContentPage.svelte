<script lang="ts">
	import { browser } from "$app/env"
	import { goto } from "$app/navigation"
	import type { UserContentConfig } from "$lib/content/user/UserContent"
	import FallbackImage from "$lib/UI/Widgets/FallbackImage.svelte"
	import InfoCard from "$lib/UI/Widgets/InfoCard.svelte"
	import TodoList from "$lib/content/todo/TodoList.svelte"
	import { getTodoList } from "$lib/content/todo/TodoList"
	import GlassyButton from "$lib/UI/Widgets/GlassyButton.svelte"
	import { myId } from "$lib/firebase/firebase"
	import type { TeamContentConfig } from "$lib/content/team/TeamContent"

	export let entity: UserContentConfig | TeamContentConfig
	export let amount: number = 10
	export let isTeam: boolean = false

	const { id, title, caption, picture } = entity
	const source = id
	const src = picture

	const edit = () => {
		if (browser) goto(`/${isTeam ? "team" : "user"}/${source}/edit`)
	}
</script>

<div class="grid">
	<div class="background">
		<div>
			<FallbackImage {src} alt={`${isTeam ? "team" : "user"} ${title}`} />
		</div>
		<div class="overlay">&nbsp;</div>
		{#if isTeam || source === myId()}
			<div class="btn">
				<GlassyButton callback={edit} />
			</div>
		{/if}
	</div>
	<p class="title">{title}</p>
	<div class="info"><slot name="info" /></div>
</div>

<section>
	<p>{caption}</p>
	<slot />
</section>

<InfoCard>
	<p slot="title">{title}'s todos!</p>
	{#await getTodoList({ source, isTeam, amount }) then todos}
		<TodoList {todos} {source} {isTeam} />
	{/await}
</InfoCard>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		justify-content: space-between;
		align-content: space-between;
		user-select: none;
	}
	.background {
		aspect-ratio: 2 / 1;
		grid-column: 1 / 3;
		grid-row: 1 / 3;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: repeat(2, 1fr);
	}
	.background > * {
		grid-row: 1 / 3;
		grid-column: 1;
	}
	.background > .btn {
		grid-row: 1 / 3;
		grid-column: 1;
		align-self: flex-start;
		justify-self: flex-end;
		margin: 1rem;
		opacity: 0;
		transition: opacity 0.7s ease;
	}
	.background:hover > .btn {
		opacity: 0.8;
	}
	.background > .overlay {
		background-image: linear-gradient(transparent, transparent, transparent, #fffb, var(--bg));
	}
	.title {
		font-size: 30px;
		padding: 1rem;
		grid-column: 1;
		grid-row: 2;
		align-self: flex-end;
	}
	.info {
		padding: 1rem;
		grid-column: 2;
		grid-row: 2;
		align-self: flex-end;
		justify-self: flex-end;
	}
	section {
		margin: 1rem;
	}
</style>
