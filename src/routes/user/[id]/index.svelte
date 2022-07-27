<script lang="ts">
	import ContentContainer from "$lib/content/ContentContainer.svelte"
	import type { UserContentConfig } from "src/lib/content/user/UserContent"

	export let user: Promise<UserContentConfig | null>
	export let error: string | null
</script>

<ContentContainer bind:content={user} {error} isTeam={false} />
