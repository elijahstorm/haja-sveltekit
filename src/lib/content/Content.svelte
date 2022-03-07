<div class="content">
	<slot />
</div>

<style>
	.content {
		margin: 1rem 0;
		padding: 2rem 0;
		background-color: var(--card);
		border: 1px var(--text) solid;
		border-radius: var(--small-radius);
		padding: var(--button-padding);
		transition: var(--short-transition);
		box-shadow: 0 4px 8px 0 rgb(0, 0, 0, 20%);
	}
</style>
