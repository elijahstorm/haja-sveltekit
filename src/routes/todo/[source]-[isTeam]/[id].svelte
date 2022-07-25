<script lang="ts">
	import Casing from "$lib/UI/PageContainers/Casing.svelte"
	import ContentContainer from "$lib/content/ContentContainer.svelte"
	import TodoContent from "$lib/content/todo/TodoContent.svelte"

	import type { TodoContentConfig } from "src/lib/content/todo/TodoContent"

	export let todo: Promise<TodoContentConfig | null>
	export let error: string | null
</script>

<svelte:head>
	{#await todo then todo}
		{#if todo}
			<title>{todo.title} | Haja: Do Together</title>
		{/if}
	{/await}
</svelte:head>

<Casing>
	{#if todo}
		<ContentContainer>
			{#await todo}
				<center>waiting...</center>
			{:then todo}
				<TodoContent {todo} />
			{/await}
		</ContentContainer>
	{:else}
		<center>{error ?? "This Todo does not exist!"}</center>
		<center>You may need to login to view this content</center>
	{/if}
</Casing>

<style>
	center {
		margin-top: 2rem;
		width: 100%;
	}
</style>
