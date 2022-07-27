<script lang="ts">
	import type { TodoColor, TodoContentConfig } from "./TodoContent"
	import { myId, uploadDocument } from "$lib/firebase/firebase"
	import "iconify-icon"

	export let source: string = myId()
	export let isTeam: boolean = false

	$: editing = false
	$: icon = editing ? "akar-icons:circle" : "gridicons:add"
	$: style = `color: var(--primary);`
	let title: string = ""
	let color: TodoColor = ""
	let input

	const type = "todo"
	const add = () => {
		editing = true
		input.focus()
	}

	const save = async () => {
		if (!editing) return

		editing = false

		const content: TodoContentConfig = {
			contentType: "todo",
			id: "",
			title: `${title}`,
			status: "todo",
			color
		}

		title = ""

		const data = await uploadDocument({
			source,
			isTeam,
			content,
			type
		})

		console.log("finished")
		console.log(data)
	}
</script>

<div class="flex" class:editing on:click={add}>
	<iconify-icon {icon} {style} width={editing ? "30px" : "32px"} />
	{#if editing}
		<input
			bind:this={input}
			bind:value={title}
			placeholder="Let's do Together!"
			on:blur={save}
			on:submit={save}
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
	}
</style>
