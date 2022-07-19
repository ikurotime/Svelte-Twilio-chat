<script>
	// @ts-nocheck

	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import Message from './Message.svelte';
	import { activeChat, activeConversation } from '$lib/stores/store';
	let div;
	let messages = [];
	const handleMessage = (message) => {
		//console.log('here');
		messages = [...messages, message];
	};
	onMount(async () => {
		const paginator = await $activeConversation.getMessages();
		messages = paginator.items;
		$activeConversation.on('messageAdded', handleMessage);
	});

	onDestroy(async () => {
		await $activeConversation.off('messageAdded', handleMessage);
		messages = [];
	});
	afterUpdate(async () => {
		div.scrollTo(0, div.scrollHeight);
	});
</script>

<div bind:this={div} class="bg-[#363535] w-full flex flex-col h-full overflow-y-scroll">
	{#each messages as message}
		<Message body={message.body} author={message.author} />
	{/each}
</div>
