<script>
	// @ts-nocheck

	import ChannelBar from '$lib/components/ChannelBar/ChannelBar.svelte';
	import ChannelBlock from '$lib/components/ChannelBar/ChannelBlock.svelte';
	import Dropdown from '$lib/components/ChannelBar/Dropdown.svelte';
	import Conversation from '$lib/components/Conversation.svelte';

	import ConversationInput from '$lib/components/ConversationInput.svelte';
	import { discordUser, activeConversation, topics } from '$lib/stores/store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	let currentServer = [];
	let currentChatname = '';
	onMount(() => {
		console.log($discordUser);
		currentServer = [];
		topics.set([]);
		if ($discordUser !== undefined) {
			$discordUser.servers
				.filter((server) => server.friendly_name === $page.params.room)
				.forEach((server) => {
					currentServer.push(server);
					console.log(currentServer);
					server.channels.forEach((channel) => {
						console.log(channel.channel_friendly_name);
						topics.set([...$topics, channel.channel_friendly_name]);
					});
				});
		}
		currentChatname = currentServer[0]?.channels[0]?.channel_friendly_name;
	});
</script>

<svelte:head>
	<title>{currentServer[0]?.channels[0]?.channel_friendly_name} | Miduscussion</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>

<ChannelBar>
	<ChannelBlock text="Channels" />
	<div class="channel-container">
		<Dropdown header="Text" />
	</div>
</ChannelBar>

<div class="dark:bg-gray-700 h-full w-full flex flex-col overflow-y-hidden text-gray-400">
	{#if currentServer}
		<h1 class=" border-b border-gray-900 px-5 py-2">
			# {currentChatname} &nbsp;|&nbsp; {currentServer[0]?.channels[0]?.description}
		</h1>
		<Conversation />
		<ConversationInput {currentChatname} />
	{/if}
</div>
