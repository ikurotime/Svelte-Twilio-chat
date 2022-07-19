<script>
	// @ts-nocheck

	import { activeConversation, roomCode } from '$lib/stores/store';
	export let currentChatname;
	let message = '';

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && message.length > 0) {
			//console.log($activeConversation);
			$activeConversation.sendMessage(message, { channel: 'general' });
			message = '';
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="grow-0 bg-neutral-700 p-5">
	<input
		type="text"
		class="p-3 border-2 border-neutral-700 w-full rounded-xl bg-neutral-600"
		placeholder={`Enviar mensaje a ${currentChatname}...`}
		bind:value={message}
	/>
</div>
