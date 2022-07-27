<script lang="ts">
	import ContentContainer from "$lib/content/ContentContainer.svelte"
	import type { TodoContentConfig } from "src/lib/content/todo/TodoContent"

	export let todo: Promise<TodoContentConfig | null>
	export let error: string | null
	export let source: string
	export let isTeam: boolean
</script>

<ContentContainer bind:content={todo} {error} {source} {isTeam} />
