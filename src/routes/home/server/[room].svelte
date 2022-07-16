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

	onMount(() => {
		topics.set([]);
		$discordUser.servers
			.filter((server) => server.friendly_name === $page.params.room)
			.forEach((server) => {
				server.channels.forEach((channel) => {
					console.log(channel.channel_friendly_name);
					topics.set([...$topics, channel.channel_friendly_name]);
				});
			});
	});
</script>

<svelte:head>
	<title>{$activeConversation.uniqueName} | Miduscussion</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>

<ChannelBar>
	<ChannelBlock text="Channels" />
	<div class="channel-container">
		<Dropdown header="Text" />
	</div>
</ChannelBar>

<div class="bg-neutral-700 h-full w-full flex flex-col overflow-y-hidden">
	{#if $activeConversation?.uniqueName}
		<h2 class="text-3xl my-2">
			{$activeConversation?.uniqueName}
		</h2>
		<Conversation />
		<ConversationInput />
	{/if}
</div>
