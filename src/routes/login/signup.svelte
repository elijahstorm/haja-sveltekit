<script lang="ts">
	import FormInfoRequestCard from "$lib/UI/Widgets/FromInfoRequestCard.svelte"
	import SmallCenterContentOverBackground from "$lib/UI/PageContainers/SmallCenterContentOverBackground.svelte"
	import { newUser } from "$lib/firebase/auth"
	import session from "$lib/firebase/session"
	import { goto } from "$app/navigation"
	import { browser } from "$app/env"

	const callback = async (form) => {
		const { error } = await newUser(form["email"], form["password"])

		return error
	}

	session.subscribe(async ({ user, ready }) => {
		if (user && ready) {
			if (browser) goto("/me")
		}
	})
</script>

<SmallCenterContentOverBackground>
	<FormInfoRequestCard
		{callback}
		inputs={[
			{
				text: "Email",
				id: "email",
				type: "email",
				icon: "/icon/person.svg"
			},
			{
				text: "Password",
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
		]}
	>
		<div slot="title">Signup</div>
		<div slot="button">Signup</div>
		<div slot="help">Start using Haja today! Enter your email and create a new password</div>
		<div slot="bottom">
			<span> Already have an account? </span>
			<a href="/login">Login</a>
		</div>
	</FormInfoRequestCard>
</SmallCenterContentOverBackground>
