<script lang="ts">
	import { getUser } from "$lib/content/user/UserContent"
	import UserFullPage from "$lib/content/user/UserFullPage.svelte"
	import { myId } from "$lib/firebase/auth"
	import ProtectedPage from "$lib/UI/PageContainers/ProtectedPage.svelte"
	import Loader from "$lib/UI/Widgets/Loader.svelte"
</script>

<ProtectedPage>
	{#await getUser({ id: myId() })}
		<Loader loadingStyle="dots" />
	{:then user}
		{#if typeof user === "string"}
			{user}
		{:else}
			<UserFullPage {user}>
				<p slot="title">{user.title}</p>
				<div>
					<a href="/team">My Teams</a>
				</div>
				<div>
					<a href="/todo">My Todos</a>
				</div>
			</UserFullPage>
		{/if}
	{/await}
</ProtectedPage>

<style>
	div {
		margin: 1rem 0;
	}
</style>
