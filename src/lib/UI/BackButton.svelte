<script lang="ts">
	import "iconify-icon"
</script>

<div class="center" on:click={() => history.back()}>
	<iconify-icon icon={"akar-icons:chevron-left"} style="color: var(--primary);" height={34} />
</div>

<style>
	.center {
		margin: auto;
		padding-right: var(--default-padding);
		cursor: pointer;
	}
</style>
