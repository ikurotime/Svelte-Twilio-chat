<script>
	// @ts-nocheck

	import ChannelBar from '$lib/components/ChannelBar/ChannelBar.svelte';
	import ChannelBlock from '$lib/components/ChannelBar/ChannelBlock.svelte';
	import Dropdown from '$lib/components/ChannelBar/Dropdown.svelte';
	import Conversation from '$lib/components/Conversation.svelte';

	import ConversationInput from '$lib/components/ConversationInput.svelte';
	import { discordUser, activeConversation, topics, userName, colorNames, isLoading, user } from '$lib/stores/store';
	import { onMount } from 'svelte';
	import { page, session } from '$app/stores';
	import { draggable } from '@neodrag/svelte'
	let innerWidth = window.innerWidth;

	let currentServer = [];
	let currentChatname = '';
	let participants = [];

	onMount(async () => {
		participants = await $activeConversation.getParticipants()
		let userData = localStorage.getItem('user');
		if (userData) {
			user.set(JSON.parse(userData));
		}
		currentServer = [];
		topics.set([]);
		if ($discordUser?.id !== undefined) {
			$discordUser.servers
				.filter((server) => server.friendly_name === $page.params.room)
				.forEach((server) => {
					currentServer.push(server);
					server.channels.forEach((channel) => {
						topics.set([...$topics, channel.friendly_name]);
					});
				});
		}else if($user?.id !== ''){
			$user?.servers
				.filter((server) => server.friendly_name === $page.params.room)
				.forEach((server) => {
					currentServer.push(server);
					server.channels.forEach((channel) => {
						topics.set([...$topics, channel.friendly_name]);
					});
				});
		}
		currentChatname = currentServer[0]?.channels[0]?.friendly_name ||  $activeConversation.channelState.friendlyName;
		isLoading.set(false);
	});
</script>

<svelte:head>
	<title>{currentServer[0]?.channels[0]?.friendly_name} | Miduscussion</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>

<ChannelBar>
	<ChannelBlock text="Channels" />
	<div class="channel-container">
		<Dropdown header="Text" />
	</div>
</ChannelBar>
<div class="flex w-full h-full flex-col">
	{#if currentServer}
	<div class="border-b border-neutral-600 p-3">
		<h1 class="text-white">
			# {currentChatname} &nbsp;|&nbsp; {currentServer[0]?.channels[0]?.description}
		</h1>
	</div>
		{/if}
		<div class="flex flex-row h-full w-full">
	{#if innerWidth < 640}
	<div class="fixed h-full w-full mt-auto " use:draggable={{axis: 'x',bounds: { right: -300 }}}>
		<div  class={`handle dark:bg-[#363535] h-full w-full flex flex-col overflow-y-hidden text-gray-400`}>
			{#if currentServer}
			<h1 class=" border-b border-gray-900 px-5 py-2">
				# {currentChatname} &nbsp;|&nbsp; {currentServer[0]?.channels[0]?.description}
			</h1>
			<Conversation />
			<ConversationInput {currentChatname} />
			{/if}
		</div>
	</div>
	{:else}
	<div  class={` relative handle dark:bg-[#363535] h-full w-full flex-1	 flex flex-col  overflow-y-hidden text-gray-400`}>
		<Conversation />
		<ConversationInput {currentChatname} />
	</div>
	{/if}
	
	<div class="min-w-[250px] h-full max-h-[92vh] pt-8 px-3 overflow-y-scroll">
		<span class="text-gray-300 text-lg">- Participants -</span>
		{#each participants as participant}
		<div class="flex p-3 gap-3 items-center">
			<img src={ participant?.state?.identity === $userName ? $session?.user_metadata?.avatar_url : `https://avatars.dicebear.com/api/open-peeps/${participant?.state?.identity}.svg`} class="w-10 h-10 rounded-full bg-white " alt={$session?.user_metadata?.full_name} />
			<span class={$colorNames[participant?.state?.identity?.length]}>{participant?.state?.identity}</span>
		</div>
		{/each}
	</div>
	</div>
</div>
	<svelte:window bind:innerWidth/>
	