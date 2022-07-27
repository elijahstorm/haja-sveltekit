<script lang="ts">
	import type { AllContentTypes } from "./Content"
	import TeamContent from "./team/TeamContent.svelte"
	import TodoContent from "./todo/TodoContent.svelte"
	import UserContent from "./user/UserContent.svelte"

	export let content: AllContentTypes
	export let card = false
	export let source: string
	export let isTeam: boolean
</script>

<section class:card>
	{#if content.contentType == "team"}
		<TeamContent team={content} />
	{:else if content.contentType == "user"}
		<UserContent user={content} />
	{:else if content.contentType == "todo"}
		<TodoContent todo={content} {source} {isTeam} />
	{/if}
</section>

<style>
	section {
		margin: 1rem 0;
		transition: var(--short-transition);
	}
	.card {
		background-color: var(--card);
		border: 1px var(--text) solid;
		border-radius: var(--small-radius);
		padding: var(--button-padding);
		box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 20%);
	}
</style>
