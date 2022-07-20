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

<!-- <ChannelBar>
	<ChannelBlock text="Home" />
	<div class="channel-container" />
	<div class="flex items-center gap-3 text-white mt-auto px-5 py-3 border-t-2 border-slate-900">
		<img
			src={$session?.user_metadata?.avatar_url}
			class="w-8 h-8 rounded-full"
			alt={$session?.user_metadata?.full_name}
		/>
		{$session?.user_metadata?.full_name}
	</div>
</ChannelBar> -->

<JoinRoom />
