<script lang="ts">
	import AddTodo from "./AddTodo.svelte"

	import type { TodoContentConfig } from "./TodoContent"
	import TodoContent from "./TodoContent.svelte"

	export let todos: TodoContentConfig[] | string = []
	export let source: string
	export let isTeam: boolean
	export let locked: boolean = false
</script>

{#if typeof todos === "string"}
	{todos}
{:else if todos.length == 0}
	No todos yet!
{:else}
	{#if !locked}
		<div>
			<AddTodo {source} {isTeam} />
		</div>
	{/if}
	{#each todos as todo}
		<div>
			<a href={`/todo/${source}-${isTeam ? "1" : "0"}/${todo.id}`}>
				<TodoContent {todo} {source} {isTeam} />
			</a>
		</div>
	{/each}
{/if}

<style>
	div {
		margin: 1rem 0;
	}
	a {
		color: unset;
		text-decoration: unset;
	}
</style>
