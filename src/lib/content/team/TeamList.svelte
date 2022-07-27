<script lang="ts">
	import type { TeamContentConfig } from "./TeamContent"
	import TeamCard from "./TeamCard.svelte"

	export let teams: TeamContentConfig[] | string = []
</script>

{#if typeof teams === "string"}
	{teams}
{:else if teams.length == 0}
	No teams joined!
{:else}
	{#each teams as team}
		<div>
			<TeamCard {team} />
		</div>
	{/each}
{/if}

<style>
	div {
		margin: 1rem 0;
	}
</style>
