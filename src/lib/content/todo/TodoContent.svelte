<script lang="ts">
	import type { TodoContentConfig } from "./TodoContent"
	import "iconify-icon"
	import { updateDocument } from "$lib/firebase/firebase"

	export let todo: TodoContentConfig
	export let source: string
	export let isTeam: boolean

	const img404 = "/404.png"
	const timeStr = new Date(todo.date).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	})
	const dateStr = new Date(todo.date).toLocaleDateString([], {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric"
	})

	let { status, color } = todo
	$: icon = status == "done" ? "akar-icons:circle-check-fill" : "akar-icons:circle"
	$: style = `color: ${color};`

	const toggleDone = () => {
		status = status == "done" ? "todo" : "done"

		updateDocument({
			id: todo.id,
			source: source,
			isTeam: isTeam,
			type: "todo",
			// ts-ignore
			content: {
				status
			}
		})
	}
</script>

{#if status != "[broken]"}
	<div class="flex">
		<iconify-icon {style} width="30px" {icon} on:click|preventDefault={toggleDone} />
		<div class="todo">
			<span class="bold">{todo.title}</span>
			<span class="date">
				{timeStr} : {dateStr}
			</span>
		</div>
	</div>
{:else}
	<img src={img404} alt="todo not found" />
{/if}

<style>
	.flex {
		display: flex;
		gap: var(--default-padding);
	}
	.todo {
		font-size: 20px;
		margin: auto 0;
	}
	.bold {
		font-weight: bold;
	}
	.date {
		opacity: 0.6;
	}
	iconify-icon {
		cursor: pointer;
	}
</style>
