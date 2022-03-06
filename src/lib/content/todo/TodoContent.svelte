<script lang="ts">
	import type { TodoContentConfig } from './TodoContent';

	export let todo: TodoContentConfig;
</script>

{#if todo}
	<div>
		Todo title: {todo.title}
	</div>
{:else}
	<div>bad content</div>
{/if}
