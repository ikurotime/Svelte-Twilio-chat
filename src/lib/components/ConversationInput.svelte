<script>
	import { activeConversation } from '$lib/stores/store';
	import EmojiPicker from './EmojiPicker.svelte';
	import MdSend from 'svelte-icons/md/MdSend.svelte';
	import TextArea from './TextAreaAutosize.svelte';
	import { onDestroy, onMount } from 'svelte';
	export let currentChatname;
	let infoParticipant = [];
	let pickedEmoji = '';
	let message = '';

	const handleTypingStart = (participant) => {
		infoParticipant = [...infoParticipant, participant];
	};
	const handleTypingEnd = (participant) => {
		infoParticipant = infoParticipant.filter((item) => item.sid !== participant.sid);
	};
	onMount(() => {
		//set up the listener for the typing started Conversation event
		$activeConversation.on('typingStarted', handleTypingStart);
		//set  the listener for the typing ended Conversation event
		$activeConversation.on('typingEnded', handleTypingEnd);
	});
	onDestroy(async () => {
		//remove the listener for the typing started Conversation event
		await $activeConversation.off('typingStarted', handleTypingStart);
		//remove the listener for the typing ended Conversation event
		await $activeConversation.off('typingEnded', handleTypingEnd);
	});
	function onEmojiChange(event) {
		pickedEmoji = event.detail.emoji;
		message = message + pickedEmoji;
	}
	const sendMessage = () => {
		if (message.length > 0) {
			$activeConversation.sendMessage(message, { channel: 'general' });
			setTimeout(() => {
				message = '';
			}, 10);
		}
	};
	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && message.length === 0 && !e.shiftKey) {
			e.preventDefault();
		} else if (e.key === 'Enter' && !e.shiftKey && message.length > 0) {
			if (message.split('\n').filter((n) => n !== '').length > 0) {
				sendMessage();
			}
		} else {
			$activeConversation.typing();
		}
	};
</script>

<div
	class="absolute block grow w-full bottom-0 bg-gray-700 dark:bg-neutral-700 p-3 items-center gap-2"
>
	<div class="flex">
		<TextArea
			bind:value={message}
			classes={'p-2 border-2 border-neutral-700 w-full rounded-xl bg-gray-600 dark:bg-neutral-600 h-14 text-white'}
			minRows={1}
			maxRows={10}
			{currentChatname}
			{handleKeyDown}
		/>
		<EmojiPicker on:change={onEmojiChange} />
		<button class="icon" on:click={sendMessage}>
			<MdSend />
		</button>
	</div>
	{#if infoParticipant.length > 2}
		<div class="flex gap-1 items-center">
			<div class="dot-elastic mx-4" />
			<p class="ml-1 text-xs">Several people are typing...</p>
		</div>
	{:else if infoParticipant[0]?.isTyping && infoParticipant[1]?.isTyping}
		<div class="flex gap-1 items-center">
			<div class="dot-elastic mx-4" />
			<p class="ml-1 text-xs">
				<strong>{infoParticipant[0].identity}</strong> and
				<strong>{infoParticipant[1].identity}</strong> are typing...
			</p>
		</div>
	{:else if infoParticipant[0]?.isTyping}
		<div class="flex gap-1 items-center">
			<div class="dot-elastic mx-4" />
			<p class="ml-1 text-xs"><strong>{infoParticipant[0].identity}</strong> is typing...</p>
		</div>
	{/if}
</div>

<style>
	.icon {
		cursor: pointer;
		width: 40px;
		height: 40px;
		border-radius: 20%;
		border: solid 1px #636363;
		padding: 5px;
		transition: all 0.2s ease-in-out;
	}
	.icon:hover {
		background-color: #636363;
	}
</style>
