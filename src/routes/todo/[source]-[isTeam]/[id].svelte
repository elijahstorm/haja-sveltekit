<script lang="ts">
	import TodoContent from '$lib/content/todo/TodoContent.svelte';
	import type { TodoContentConfig } from 'src/lib/content/todo/TodoContent';
	export let todo: TodoContentConfig;
</script>

<TodoContent {todo} />
