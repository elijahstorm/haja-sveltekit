<script lang="ts">
	import FallbackImage from "$lib/UI/Widgets/FallbackImage.svelte"

	import type { UserContentConfig } from "./UserContent"

	export let user: UserContentConfig
</script>

<p>
	{user.title}
</p>
<p>
	{user.id}
</p>
<FallbackImage src={user.picture} alt={`${user.title} profile`} />
