<script>
	// @ts-nocheck

	import ChannelBar from '$lib/components/ChannelBar/ChannelBar.svelte';
	import ChannelBlock from '$lib/components/ChannelBar/ChannelBlock.svelte';
	import Dropdown from '$lib/components/ChannelBar/Dropdown.svelte';
	import Conversation from '$lib/components/Conversation.svelte';

	import ConversationInput from '$lib/components/ConversationInput.svelte';
	import { discordUser, activeConversation, topics, userName, colorNames, isLoading, user, serverInviteLink, isChatLoading, selectedChat, inviteCode } from '$lib/stores/store';
	import { onMount } from 'svelte';
	import { page, session } from '$app/stores';
	import { draggable } from '@neodrag/svelte'
import LoadingScreen from '$lib/components/LoadingScreen.svelte';

	let innerWidth = window.innerWidth;

	let currentServer = [];
	let currentChatname = '';
	let participants = [];

	onMount(async () => {
		const uid = $discordUser?.user?.id || $discordUser?.user?.user?.id
		participants = await $activeConversation.getParticipants()
		currentServer = [];
		topics.set([]);
		if (uid !== undefined) {
			$discordUser.servers
				.filter((server) => server.friendly_name === $page.params.room)
				.forEach((server) => {
					currentServer.push(server);
					server.channels.forEach((channel) => {
						topics.set([...$topics, {friendlyName: channel.friendly_name, id: channel.id, description: channel.description}]);
					});
				});
		}else{
			$user.servers
				.filter((server) => server.friendly_name === $page.params.room)
				.forEach((server) => {
					currentServer.push(server);
					server.channels.forEach((channel) => {
						topics.set([...$topics, {friendlyName: channel.friendly_name, id: channel.id, description: channel.description}]);
					});
				});
		}
			serverInviteLink.set($page.url.origin + '/invite/' + currentServer[0]?.invite_code);
		currentChatname = currentServer[0]?.channels[0]?.friendly_name ||  $activeConversation.channelState.friendlyName;
		selectedChat.set({friendlyName: currentChatname, id: currentServer[0]?.channels[0]?.id , description: currentServer[0]?.channels[0]?.description});
		inviteCode.set(currentServer[0]?.invite_code);
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
		<h1 class="text-gray-300 dark:text-white">
			# {$selectedChat?.friendlyName} &nbsp;|&nbsp; {$selectedChat?.description}
		</h1>
	</div>
		{/if}
		<div class="flex flex-row h-full w-full">
	{#if innerWidth < 640}
	<div class="fixed h-full w-full mt-auto " use:draggable={{axis: 'x',bounds: { right: -300 }}}>
		<div  class={`handle bg-gray-600 dark:bg-[#363535] h-full w-full flex flex-col overflow-y-hidden text-gray-400`}>
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
	<div  class={` relative handle bg-gray-400 dark:bg-[#363535] h-full w-full flex-1	 flex flex-col  overflow-y-hidden text-gray-400`}>
		{#if $isChatLoading}
		<LoadingScreen bgColor="bg-gray-400 dark:bg-[#363535]"/>
		{:else}
		<Conversation />
		<ConversationInput {currentChatname} />
		{/if}
	</div>
	{/if}
	
	<div class="min-w-[250px] h-full max-h-[92vh] pt-8 px-3 overflow-y-scroll bg-gray-500 dark:bg-neutral-800">
		<span class="text-gray-300 text-lg">- Participants -</span>
		{#each participants as participant}
		<div class="flex p-3 gap-3 items-center">
			<img src={ participant?.state?.identity === $userName || participant?.state?.identity === $user?.username ? $session?.user_metadata?.avatar_url || $user.avatar || $discordUser?.user?.avatar : `https://avatars.dicebear.com/api/open-peeps/${participant?.state?.identity}.svg`} class="w-10 h-10 rounded-full bg-white " alt={$session?.user_metadata?.full_name} />
			<span class={$colorNames[participant?.state?.identity?.length]}>{participant?.state?.identity}</span>
		</div>
		{/each}
	</div>
	</div>
</div>
	<svelte:window bind:innerWidth/>
	