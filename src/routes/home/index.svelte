<script>
	import JoinRoom from '$lib/components/Index/JoinRoom.svelte';
	export let userData;
	import { discordUser } from '$lib/stores/store';
	
	discordUser.set(userData);
</script>

<svelte:head>
	<title>Home | Miduscussion</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>


<JoinRoom />
