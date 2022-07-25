<script lang="ts">
	import SmallCenterContentOverBackground from "$lib/UI/PageContainers/SmallCenterContentOverBackground.svelte"
	import { goto } from "$app/navigation"
	import session from "$lib/firebase/session"
	import { onMount } from "svelte"

	session.subscribe(async ({ user }) => {
		if (!user) {
			onMount(() => {
				goto("/login")
			})
		}
	})
</script>

<SmallCenterContentOverBackground>Hell ya</SmallCenterContentOverBackground>
