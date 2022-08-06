<script lang="ts">
	import type { TeamContentConfig } from "./TeamContent"
	import FullContentPage from "../FullContentPage.svelte"
	import UserIconList from "../user/UserIconList.svelte"

	export let team: TeamContentConfig

	$: users = team.users
</script>

<FullContentPage entity={team} isTeam={true}>
	<div slot="info">
		<UserIconList {users} hideMe />
		<p>
			{users.length} user{users.length != 1 ? "s" : ""}
		</p>
	</div>
	<slot />
</FullContentPage>

<style>
	div {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-content: center;
		gap: 1rem;
	}
	p {
		font-size: 20px;
		align-self: center;
	}
</style>
