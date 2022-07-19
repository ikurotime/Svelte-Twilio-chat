<script>
	import { activeConversation, roomCode } from '$lib/stores/store';
	import EmojiPicker from './EmojiPicker.svelte';
	import MdSend from 'svelte-icons/md/MdSend.svelte'
	export let currentChatname;

  let pickedEmoji = "";
	let message = '';
	
	function onEmojiChange(event) {
		pickedEmoji = event.detail.emoji;
		message = message + pickedEmoji;
	}
	const sendMessage = () => {
		if (message.length > 0) {
			$activeConversation.sendMessage(message, { channel: 'general' });
			message = '';
		}
	};
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
				sendMessage();
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
<svelte:window on:keydown={handleKeyDown} />

<div class="grow-0 bg-neutral-700 p-3 flex items-center gap-1">
	<input
		type="text"
		class="p-2 border-2 border-neutral-700 w-full rounded-xl bg-neutral-600"
		placeholder={`Enviar mensaje a ${currentChatname}`}
		bind:value={message}
	/>
	<EmojiPicker on:change={onEmojiChange}/>
	<button class="icon" on:click={sendMessage}>
		<MdSend/>
	</button>

</div>
