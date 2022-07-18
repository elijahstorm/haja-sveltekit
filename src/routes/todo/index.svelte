<script lang="ts">
	import HalfPageInfoAndGraphic from "$lib/UI/PageContainers/HalfPageInfoAndGraphic.svelte"

	export function load({ params }) {
		return {
			props: {
				id: params.id
			}
		}
	}
</script>

<HalfPageInfoAndGraphic icon={"events"}>This Todo doesn't exist! :(</HalfPageInfoAndGraphic>
