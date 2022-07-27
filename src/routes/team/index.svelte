<script lang="ts">
	import { getTeamList } from "$lib/content/team/TeamList"
	import TeamList from "$lib/content/team/TeamList.svelte"
	import ProtectedPage from "$lib/UI/PageContainers/ProtectedPage.svelte"
	import Loader from "$lib/UI/Widgets/Loader.svelte"
</script>

<ProtectedPage>
	{#await getTeamList({})}
		<Loader loadingStyle="dots" top={4} />
	{:then teams}
		<TeamList {teams} />
	{/await}
</ProtectedPage>
