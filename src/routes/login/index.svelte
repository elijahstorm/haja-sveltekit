<script lang="ts">
	import { googleLogin } from '$lib/firebase';
	import LoginForm from '$lib/UI/LoginForm.svelte';
	import HalfPageInfoAndGraphic from '$lib/UI/PageContainers/HalfPageInfoAndGraphic.svelte';

	function login() {
		googleLogin();
	}
</script>

<HalfPageInfoAndGraphic>
	<LoginForm />
</HalfPageInfoAndGraphic>
