<script>
	// @ts-nocheck

	import { onMount, afterUpdate } from 'svelte';
	import { activeConversation } from '$lib/stores/store';
	import Message from './Message.svelte';

	let div;
	let messages = [];

	onMount(async () => {
		console.log($activeConversation);
		const paginator = await $activeConversation.getMessages();
		messages = paginator.items;
		console.log(messages.at(-1));

		$activeConversation.on('messageAdded', (message) => {
			messages = [...messages, message];
		});
	});

	afterUpdate(() => {
		div.scrollTo(0, div.scrollHeight);
	});
</script>

<div bind:this={div} class="bg-neutral-600 w-full flex flex-col h-full overflow-y-scroll">
	{#each messages as message}
		<Message {message} />
	{/each}
</div>
