<script lang="ts">
	import { browser } from "$app/env"
	import { goto } from "$app/navigation"
	import session from "$lib/firebase/session"

	import LoginForm from "$lib/UI/LoginForm.svelte"
	import HalfPageInfoAndGraphic from "$lib/UI/PageContainers/HalfPageInfoAndGraphic.svelte"

	session.subscribe(async ({ user, ready }) => {
		if (user && ready) {
			if (browser) goto("/me")
		}
	})
</script>

<HalfPageInfoAndGraphic>
	<LoginForm />
</HalfPageInfoAndGraphic>
