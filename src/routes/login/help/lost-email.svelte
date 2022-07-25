<script lang="ts">
	import FormInfoRequestCard from "$lib/UI/Widgets/FromInfoRequestCard.svelte"
	import SmallCenterContentOverBackground from "$lib/UI/PageContainers/SmallCenterContentOverBackground.svelte"
</script>

<SmallCenterContentOverBackground>
	<FormInfoRequestCard
		inputs={[
			{
				text: "Username",
				name: "email",
				id: "email_reset",
				type: "email",
				icon: "/icon/person.svg"
			},
			{
				text: "Username",
				name: "email",
				id: "email_reset",
				type: "email",
				icon: "/icon/person.svg"
			}
		]}
	>
		<div slot="title">Lost Email</div>
		<div slot="button">Request email</div>
	</FormInfoRequestCard>
</SmallCenterContentOverBackground>
