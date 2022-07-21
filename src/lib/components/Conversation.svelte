<script>
	import { afterUpdate, onDestroy, onMount } from 'svelte';
	import Message from './Message.svelte';
	import { activeConversation } from '$lib/stores/store';

	let div;
	let messages = [];
	const handleMessage = (message) => {
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
		div?.scrollTo(0, div.scrollHeight);
	});
</script>

<div
	bind:this={div}
	class="absolute bottom-8 bg-gray-400 dark:bg-[#363535] w-full flex flex-col h-fit max-h-[85vh] mt-auto overflow-y-scroll scroll p-2 mb-10"
>
	{#each messages as message, i}
		{#if messages[i - 1] && messages[i - 1].author === message.author}
			<Message {message} />
		{:else}
			<Message {message} newUser />
		{/if}
	{/each}
</div>
