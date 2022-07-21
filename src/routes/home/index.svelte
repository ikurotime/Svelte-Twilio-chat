<script>
	import JoinRoom from '$lib/components/Index/JoinRoom.svelte';
	export let userData;
	import { discordUser, isLoading } from '$lib/stores/store';
	import { onMount } from 'svelte';

	discordUser.set(userData);
	onMount(() => {
		isLoading.set(false);
	});
</script>

<svelte:head>
	<title>Home | TechTalks</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>

<JoinRoom />
