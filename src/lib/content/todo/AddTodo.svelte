<script lang="ts">
	import type { TodoColor, TodoContentConfig } from "./TodoContent"
	import { myId, uploadDocument } from "$lib/firebase/firebase"
	import Icon from "@iconify/svelte"

	export let source: string = myId()
	export let isTeam: boolean = false
	export let callback: (todo: TodoContentConfig) => void = (_) => {}

	const width = 30
	let input
	let editing = false
	let title: string = ""
	let color: TodoColor = ""
	$: style = color == "" ? "var(--primary);" : color
	$: icon = editing ? "akar-icons:circle" : "gridicons:add"

	const type = "todo"
	const add = () => {
		editing = true
		setTimeout(() => input.focus(), 1)
	}

	const save = () => {
		if (!editing) return

		editing = false

		if (title == "") return

		const content: TodoContentConfig = {
			contentType: "todo",
			id: "",
			title: `${title}`,
			caption: "",
			status: "todo",
			type: "",
			date: new Date(),
			color
		}

		title = ""

		callback(content)

		uploadDocument({
			source,
			isTeam,
			content,
			type
		})
	}

	const saveOnEnter = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			save()
		}
	}
</script>

<div class="flex" class:editing on:click={add}>
	<div>
		<Icon {icon} color={style} {width} />
	</div>
	{#if editing}
		<input
			bind:this={input}
			bind:value={title}
			placeholder="Let's do Together!"
			on:blur={save}
			on:keydown={saveOnEnter}
		/>
	{:else}
		<div class="todo">
			<span class="bold">Add a new todo now!</span>
		</div>
	{/if}
</div>

<style>
	.flex {
		display: flex;
		gap: var(--default-padding);
	}
	.flex > :first-child {
		flex: 0 0 30px;
	}
	.flex:not(.editing) {
		cursor: pointer;
	}
	.todo {
		font-size: 20px;
		margin: auto 0;
	}
	.bold {
		font-weight: bold;
	}
	input {
		width: 100%;
		border: none;
		font-size: 20px;
		font-weight: bold;
		background: transparent;
	}
</style>
