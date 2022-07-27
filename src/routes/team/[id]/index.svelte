<script lang="ts">
	import ContentContainer from "$lib/content/ContentContainer.svelte"
	import type { TeamContentConfig } from "src/lib/content/team/TeamContent"

	export let team: Promise<TeamContentConfig | null>
	export let error: string | null
</script>

<ContentContainer bind:content={team} {error} isTeam={true} />
