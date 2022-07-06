<script>
	// @ts-nocheck

	import { activeConversation } from '../store';

	let message = '';

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			$activeConversation.sendMessage(message,{channel: 'general'});
			message = '';
		}
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="grow-0">
	<input type="text" class="p-3 border-2 w-full rounded" bind:value={message} />
</div>
