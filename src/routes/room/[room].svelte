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

{#if $activeConversation?.uniqueName}
	<h2 class="text-3xl my-2">
		{$activeConversation?.uniqueName}
	</h2>
	<div class="flex flex-col max-w-6xl mx-auto py-2 w-full overflow-y-scroll">
		<Conversation />
	</div>
	<ConversationInput />
{/if}
