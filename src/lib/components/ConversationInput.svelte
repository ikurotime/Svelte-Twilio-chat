<script>
	// @ts-nocheck

	import { activeConversation, roomCode } from '$lib/stores/store';

	let message = '';

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			//console.log($activeConversation);
			$activeConversation.sendMessage(message, { channel: 'general' });
			message = '';
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="grow-0">
	<input
		type="text"
		class="p-3 border-2 border-neutral-700 w-full rounded-xl bg-neutral-500"
		placeholder={`Enviar mensaje a ${$roomCode}...`}
		bind:value={message}
	/>
</div>
