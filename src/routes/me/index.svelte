<script lang="ts">
	import { goto } from "$app/navigation"

	import session from "$lib/firebase/session"
	import Casing from "$lib/UI/PageContainers/Casing.svelte"

	session.subscribe(async ({ user }) => {
		if (!user) {
			goto("/")
		}
	})
</script>

<Casing backBtn={false} />
