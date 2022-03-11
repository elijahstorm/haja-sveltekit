<script lang="ts">
	import Casing from '$lib/UI/PageContainers/Casing.svelte';
	import ContentContainer from '$lib/content/ContentContainer.svelte';
	import TodoContent from '$lib/content/todo/TodoContent.svelte';
	import type { TodoContentConfig } from 'src/lib/content/todo/TodoContent';
	export let todo: Promise<TodoContentConfig>;
</script>

<svelte:head>
	{#await todo then todo}
		<title>{todo.title} | Haja: Do Together</title>
	{/await}
</svelte:head>

<Casing>
	<ContentContainer>
		{#await todo}
			<div>waiting...</div>
		{:then todo}
			<TodoContent {todo} />
		{/await}
	</ContentContainer>
</Casing>
