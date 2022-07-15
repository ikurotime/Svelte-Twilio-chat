<script>
	// @ts-nocheck

	import { afterUpdate, onMount } from 'svelte';
	import Message from './Message.svelte';
	import { activeChat, activeConversation } from '$lib/stores/store';
	let div;
	onMount(async () => {
		$activeConversation.on('messageAdded', (message) => {
			activeChat.set([...$activeChat, message]);
		});
	});
	afterUpdate(() => {
		div.scrollTo(0, div.scrollHeight);
	});
</script>

<div bind:this={div} class="bg-neutral-600 w-full flex flex-col h-full overflow-y-scroll">
	{#each $activeChat as message}
		<Message body={message.body} author={message.author} />
	{/each}
</div>
