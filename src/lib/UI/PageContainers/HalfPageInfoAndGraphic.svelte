<script lang="ts">
	import Logo from "$lib/UI/Branding/Logo.svelte"

	const icons = {
		calendar: "/icon/calendar.svg",
		events: "/icon/events.svg",
		girlParty: "/girl-icon/party.svg",
		halloween: "/icon/halloween.svg",
		heart: "/icon/heart.svg",
		hospital: "/icon/hospital.svg",
		toronto: "/icon/toronto.svg",
		welcome: "/icon/welcome.svg"
	}

	export let icon: keyof typeof icons = "events"

	const src = icons[icon]
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;500;700;900&family=Roboto:ital,wght@0,100;0,300;0,500;0,700;0,900;1,500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="container">
	<div class="left">
		<div class="logo">
			<Logo url={"/haja/logo_horizontal_white.png"} height={200} />
		</div>
		<div class="bottom-logo">
			<img src="/icon/blob.svg" alt="white background" />
			<img {src} alt="haja-icon" />
		</div>
	</div>

	<div class="right">
		<div class="logo small">
			<Logo url={"/haja/logo_horizontal_full.png"} height={100} />
		</div>
		<slot />
		<img {src} alt="haja-icon" />
	</div>
</div>

<style>
	:global(body) {
		font-family: Roboto;
	}

	.container {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		background-color: var(--bg);
	}

	.left,
	.right {
		overflow: hidden;
		padding: 4rem 4rem 0 4rem;
		display: flex;
		flex-direction: column;
	}

	.left {
		flex: 2;
		max-width: 600px;
		background-color: var(--primary);
		/* border-right: #191919 solid 1px; */
		/* box-shadow: 6px 0px 20px 18px rgb(0 0 0 / 12%); */
		user-select: none;
		-webkit-user-select: none;
	}

	.left > * {
		flex: 1;
		margin: auto;
		max-width: 400px;
	}
	.left > .bottom-logo {
		position: relative;
		margin-bottom: 2rem;
		width: 100%;
		height: 0;
	}
	.left > .bottom-logo * {
		position: absolute;
	}

	.right {
		flex: 3;
		max-width: 600px;
		overflow-y: auto;
	}
	.logo {
		margin: 0 auto 1rem auto;
		width: 100%;
		max-width: 200px;
		max-height: 100%;
		text-align: center;
	}

	.right img {
		margin: auto;
	}
	.logo.small,
	.right > img:last-of-type {
		max-width: 300px;
		opacity: 0;
		margin-bottom: 2rem;
	}
	.right > img:last-of-type {
		display: none;
	}

	@media only screen and (max-width: 37.5em) {
		.logo.small,
		.right > img:last-of-type {
			opacity: 1;
		}
		.right > img:last-of-type {
			display: block;
		}
		.left {
			display: none;
		}
	}
</style>
