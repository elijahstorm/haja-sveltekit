<script lang="ts">
	import FormInfoRequestCard from "$lib/UI/Widgets/FromInfoRequestCard.svelte"
	import SmallCenterContentOverBackground from "$lib/UI/PageContainers/SmallCenterContentOverBackground.svelte"
	import session from "$lib/firebase/session"
	import { goto } from "$app/navigation"
	import { updatePassword } from "firebase/auth"

	export let validation: string
	export let error: string
	export let requestLink: string

	const callback = async (form) => {
		if (loggedIn) {
		} else {
		}

		await updatePassword(form["password"], requestLink)

		success = true
	}

	$: success = false
	$: loggedIn = false

	session.subscribe(async ({ user }) => {
		loggedIn = user ? true : false

		if (!loggedIn && requestLink === "") {
			goto("/login")
		}
	})
</script>

<SmallCenterContentOverBackground>
	{#if !success}
		<FormInfoRequestCard
			{callback}
			inputs={[
				...(loggedIn
					? [
							{
								text: "Current Password",
								id: "cur_password",
								type: "password",
								icon: "/icon/key.svg"
							}
					  ]
					: []),
				...[
					{
						text: "New Password",
						id: "password",
						type: "password",
						icon: "/icon/key.svg"
					},
					{
						text: "Confirm Password",
						id: "pass_confirm",
						type: "password",
						icon: "/icon/key.svg"
					}
				]
			]}
		>
			<div slot="title">Update Password</div>
			<div slot="button">Update</div>
		</FormInfoRequestCard>
	{:else}
		<span>Password updated. </span>
		<a href="/login">Login</a>
	{/if}
</SmallCenterContentOverBackground>
