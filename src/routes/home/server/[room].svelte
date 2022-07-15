<script>
	// @ts-nocheck

	import ChannelBar from '$lib/components/ChannelBar/ChannelBar.svelte';
	import ChannelBlock from '$lib/components/ChannelBar/ChannelBlock.svelte';
	import Dropdown from '$lib/components/ChannelBar/Dropdown.svelte';
	import Conversation from '$lib/components/Conversation.svelte';

	import ConversationInput from '$lib/components/ConversationInput.svelte';
	import { activeChat, activeConversation } from '$lib/stores/store';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';

	const topics = ['tailwind-css', 'react'];
	const questions = ['jit-compilation', 'purge-files', 'dark-mode'];
	const random = ['variants', 'plugins'];
</script>

<svelte:head>
	<title>{$activeConversation.uniqueName} | Miduscussion</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>

<ChannelBar>
	<ChannelBlock text="Channels" />
	<div class="channel-container">
		<Dropdown header="Topics" selections={topics} />
		<Dropdown header="Questions" selections={questions} />
		<Dropdown header="Random" selections={random} />
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
