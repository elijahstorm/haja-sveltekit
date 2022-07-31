<script lang="ts">
	import { awaitMyId } from "$lib/firebase/auth"
	import Loader from "$lib/UI/Widgets/Loader.svelte"
	import { getUser } from "./UserContent"
	import UserIcon from "./UserIcon.svelte"

	const SHOW_MAX_LENGTH = 4
	const size = 2

	export let users: string[] = []
	export let hideMe = false

	if (users.length <= SHOW_MAX_LENGTH) {
		hideMe = false
	}
</script>

<section class="user-icon-list">
	{#await awaitMyId() then myself}
		{#each users.filter((id) => !hideMe || id != myself).slice(0, SHOW_MAX_LENGTH) as id}
			{#await getUser({ id })}
				<Loader {size} />
			{:then user}
				{#if typeof user !== "string"}
					<UserIcon {user} {size} />
				{/if}
			{/await}
		{/each}
	{/await}
</section>

<style>
	section {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: repeat(4, 1fr);
	}
	:global(section.user-icon-list > .profile:nth-child(1)) {
		transform: translateX(0%);
		grid-column: 4;
		grid-row: 1;
	}
	:global(section.user-icon-list > .profile:nth-child(2)) {
		transform: translateX(50%);
		grid-column: 3;
		grid-row: 1;
	}
	:global(section.user-icon-list > .profile:nth-child(3)) {
		transform: translateX(100%);
		grid-column: 2;
		grid-row: 1;
	}
	:global(section.user-icon-list > .profile:nth-child(4)) {
		transform: translateX(150%);
		grid-column: 1;
		grid-row: 1;
	}
</style>
