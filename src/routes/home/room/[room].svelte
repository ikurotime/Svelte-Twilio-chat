<script>
	// @ts-nocheck
	import Conversation from '../../components/Conversation.svelte';

	import ConversationInput from '../../components/ConversationInput.svelte';
	import { activeConversation } from '../../store';
</script>

<svelte:head>
	<title>{$activeConversation.uniqueName} | Miduscussion</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>

<div class="bg-neutral-700 h-full w-full grid place-content-center overflow-y-hidden">
{#if $activeConversation?.uniqueName}
	<h2 class="text-3xl my-2">
		{$activeConversation?.uniqueName}
	</h2>
		<Conversation />
	<ConversationInput />
{/if}
</div>