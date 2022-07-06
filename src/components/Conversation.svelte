<script>
	// @ts-nocheck

	import { onMount, afterUpdate } from 'svelte';
	import { activeConversation } from '../store';
	import Message from './Message.svelte';

	let div;
	let messages = [];

	onMount(async () => {
		const paginator = await $activeConversation.getMessages();
		messages = paginator.items;

		$activeConversation.on('messageAdded', (message) => {
			messages = [...messages, message];
		});
	});

	afterUpdate(() => {
		div.scrollTo(0, div.scrollHeight);
	});
</script>

<div bind:this={div}>
	{#each messages as message}
		<Message {message} />
	{/each}
</div>
