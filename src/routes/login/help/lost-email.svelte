<script lang="ts">
	import InfoCard from "$lib/UI/Widgets/InfoCard.svelte"
	import SmallCenterContentOverBackground from "$lib/UI/PageContainers/SmallCenterContentOverBackground.svelte"
</script>

<SmallCenterContentOverBackground>
	<InfoCard
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
	</InfoCard>
</SmallCenterContentOverBackground>
