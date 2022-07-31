<script lang="ts">
	import type { TodoContentConfig } from "./TodoContent"
	import Icon from "@iconify/svelte"
	import { updateDocument } from "$lib/firebase/firebase"

	export let todo: TodoContentConfig
	export let source: string
	export let isTeam: boolean

	const img404 = "/404.png"
	const width = 30
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
	color = color == "" ? "var(--primary)" : color

	const toggleDone = () => {
		status = status == "done" ? "todo" : "done"

		updateDocument({
			id: todo.id,
			source: source,
			isTeam: isTeam,
			type: "todo",
			content: {
				status
			}
		})
	}
</script>

{#if status != "[broken]"}
	<div class="flex">
		<div class="icon" on:click|preventDefault={toggleDone}>
			<Icon {color} {width} {icon} />
			<!-- <div class="animator" style={`border-color: ${color};`} />
			<div class="blocker" /> -->
		</div>
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
	.icon {
		cursor: pointer;
		position: relative;
	}
	.icon > div {
		position: absolute;
		top: 0;
		width: 30px;
		height: 30px;
		display: none;
		border-radius: 50%;
	}
	.icon:hover > div {
		display: block;
	}
	.icon > .animator {
		background: linear-gradient(var(--bg), var(--bg), transparent, transparent, transparent);
	}
	/* .icon:hover > .animator { */
	.icon:hover > .animator {
		animation-name: rotate;
		animation-duration: 7s;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}
	.icon > .blocker {
		margin: 4px;
		width: calc(30px - 8px);
		height: calc(30px - 8px);
		background: var(--bg);
	}
	.icon:hover > .blocker {
		display: block;
	}
	@keyframes rotate {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
