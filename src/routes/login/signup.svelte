<script lang="ts">
	import FormInfoRequestCard from "$lib/UI/Widgets/FromInfoRequestCard.svelte"
	import SmallCenterContentOverBackground from "$lib/UI/PageContainers/SmallCenterContentOverBackground.svelte"

	const callback = (form) => {
		console.log(form["email"].value)
		console.log(form["password"].value)
		console.log(form["pass_confirm"].value)
	}
</script>

<SmallCenterContentOverBackground>
	<FormInfoRequestCard
		{callback}
		inputs={[
			{
				text: "Email",
				name: "email",
				id: "email",
				type: "email",
				icon: "/icon/person.svg"
			},
			{
				text: "Password",
				name: "password",
				id: "password",
				type: "password",
				icon: "/icon/key.svg"
			},
			{
				text: "Confirm Password",
				name: "pass_confirm",
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
