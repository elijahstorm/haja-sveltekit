<script lang="ts">
	import { getTodoList } from "$lib/content/todo/TodoList"
	import TodoList from "$lib/content/todo/TodoList.svelte"
	import { myId } from "$lib/firebase/auth"
	import ProtectedPage from "$lib/UI/PageContainers/ProtectedPage.svelte"
	import Loader from "$lib/UI/Widgets/Loader.svelte"
</script>

<ProtectedPage>
	{#await getTodoList({ source: myId() })}
		<Loader loadingStyle="dots" top={4} />
	{:then todos}
		<TodoList {todos} source={myId()} isTeam={false} />
	{/await}
</ProtectedPage>
