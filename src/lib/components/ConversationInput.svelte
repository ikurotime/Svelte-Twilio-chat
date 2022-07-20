<script>
	import { activeConversation } from '$lib/stores/store';
	import EmojiPicker from './EmojiPicker.svelte';
	import MdSend from 'svelte-icons/md/MdSend.svelte'
	import TextArea from './TextAreaAutosize.svelte';
import { onDestroy, onMount } from 'svelte';
	export let currentChatname;
	let infoParticipant;
  let pickedEmoji = "";
	let message = '';
	
	const handleTypingStart = (participant) => {
		console.log(participant.identity,true);
		infoParticipant = participant;
	};
	const handleTypingEnd = (participant) => {
		console.log(participant.identity,false);
		infoParticipant = participant;
	};
	onMount(() => {
		//set up the listener for the typing started Conversation event
		$activeConversation.on('typingStarted', handleTypingStart);
		//set  the listener for the typing ended Conversation event
		$activeConversation.on('typingEnded', handleTypingEnd);
	});
	onDestroy(async() => {
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
		if(e.key === 'Enter' && message.length === 0 && !e.shiftKey) {
			e.preventDefault();
		}else if (e.key === 'Enter' && !e.shiftKey && message.length > 0) {
			if(message.split('\n').filter(n => n !== '').length > 0){
				sendMessage();
			}
		}else{
			$activeConversation.typing();
		}
	};
	
</script>
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

<div class="absolute block grow w-full bottom-0 bg-neutral-700 p-3 items-center gap-1">

	<div class="flex">
		<TextArea 
  bind:value={message} 
	classes={"p-2 border-2 border-neutral-700 w-full rounded-xl bg-neutral-600 h-14 text-white"}
  minRows={1}
	maxRows={10}
	{currentChatname}
	{handleKeyDown}
 />
	<EmojiPicker on:change={onEmojiChange}/>
	<button class="icon" on:click={sendMessage}>
		<MdSend/>
	</button>
	</div>
	{#if infoParticipant?.isTyping}
	<div class="flex gap-1 items-center">
		<div class="dot-elastic mx-4"></div>
		<p class="ml-1 text-xs"><strong>{infoParticipant.identity}</strong> is typing...</p>
	</div>
		{/if}
</div>



