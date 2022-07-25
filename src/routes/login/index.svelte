<script lang="ts">
	import { goto } from "$app/navigation"

	import session from "$lib/firebase/session"

	import LoginForm from "$lib/UI/LoginForm.svelte"
	import HalfPageInfoAndGraphic from "$lib/UI/PageContainers/HalfPageInfoAndGraphic.svelte"

	session.subscribe(async ({ user }) => {
		if (user) {
			goto("/")
		}
	})
</script>

<HalfPageInfoAndGraphic>
	<LoginForm />
</HalfPageInfoAndGraphic>
