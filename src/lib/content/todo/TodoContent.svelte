<script lang="ts">
	import type { TodoContentConfig } from "./TodoContent"
	import "iconify-icon"

	export let todo: TodoContentConfig

	const img404 = "/404.png"
	const color = todo.color
	const icon = todo.status == "done" ? "akar-icons:circle-check-fill" : "akar-icons:circle"
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

	$: style = `color: ${color};`
</script>

{#if todo.status != "[broken]"}
	<div class="flex">
		<iconify-icon {style} width="30px" {icon} />
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
</style>
