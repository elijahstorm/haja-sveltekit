<script lang="ts">
	import type { UserContentConfig } from "./UserContent"
	import type { TeamContentConfig } from "../team/TeamContent"
	import FullContentPage from "../FullContentPage.svelte"

	export let user: UserContentConfig | TeamContentConfig
</script>

<FullContentPage entity={user}>
	<!-- <div slot="info" /> -->
	<slot />
</FullContentPage>
