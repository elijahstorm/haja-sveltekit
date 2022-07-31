<script lang="ts">
	import AddTodo from "./AddTodo.svelte"
	import type { TodoContentConfig } from "./TodoContent"
	import TodoContent from "./TodoContent.svelte"

	export let todos: TodoContentConfig[] | string = []
	export let source: string
	export let isTeam: boolean
	export let locked: boolean = false

	let push = false

	const callback = (todo: TodoContentConfig) => {
		if (typeof todos === "string") return

		todos = [todo, ...todos]
		push = true

		setTimeout(() => {
			push = false
		}, 1100)
	}
</script>

{#if typeof todos === "string"}
	{todos}
{:else if todos.length == 0}
	No todos yet!
{:else}
	{#if !locked}
		<div class="add" class:push>
			<AddTodo {source} {isTeam} {callback} />
		</div>
	{/if}
	<div class:push>
		{#each todos as todo}
			<div class="todo">
				<a href={`/todo/${source}-${isTeam ? "1" : "0"}/${todo.id}`}>
					<TodoContent {todo} {source} {isTeam} />
				</a>
			</div>
		{/each}
	</div>
{/if}

<style>
	.todo {
		margin: 1rem 0;
	}
	a {
		color: unset;
		text-decoration: unset;
	}
	:not(.add).push {
		transform: translateY(-3rem);
		animation-name: push;
		animation-delay: 100ms;
		animation-duration: 1000ms;
		animation-timing-function: ease;
	}
	.add.push {
		opacity: 0;
		animation-name: fade;
		animation-delay: 600ms;
		animation-duration: 500ms;
		animation-timing-function: ease;
	}
	@keyframes push {
		from {
			transform: translateY(-3rem);
		}
		to {
			transform: translateY(0);
		}
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
