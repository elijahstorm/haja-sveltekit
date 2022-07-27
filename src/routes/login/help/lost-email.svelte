<script lang="ts">
	import FormInfoRequestCard from "$lib/UI/Widgets/FromInfoRequestCard.svelte"
	import SmallCenterContentOverBackground from "$lib/UI/PageContainers/SmallCenterContentOverBackground.svelte"
	import { lostPassword } from "$lib/firebase/firebase"
	import InfoCard from "$lib/UI/Widgets/InfoCard.svelte"
	import session from "$lib/firebase/session"
	import { goto } from "$app/navigation"
	import { browser } from "$app/env"

	const callback = async (form) => {
		formSent = lostPassword(form["email"])
		started = true
	}

	let formSent
	$: started = false

	session.subscribe(async ({ user, ready }) => {
		if (user && ready) {
			if (browser) goto("/me")
		}
	})
</script>

<SmallCenterContentOverBackground>
	{#if started}
		<InfoCard>
			{#await formSent}
				Sending....
			{:then response}
				{#if response.error}
					{response.error}
				{:else}
					A password change email was sent
				{/if}
			{/await}
		</InfoCard>
	{:else}
		<FormInfoRequestCard
			{callback}
			inputs={[
				{
					text: "Email",
					id: "email",
					type: "email",
					icon: "/icon/person.svg"
				}
			]}
		>
			<div slot="title">Lost Email</div>
			<div slot="button">Request email</div>
		</FormInfoRequestCard>
	{/if}
</SmallCenterContentOverBackground>
