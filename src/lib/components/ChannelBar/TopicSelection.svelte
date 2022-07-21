<script>
import { JoinConversation } from '$lib/services/user';

import { activeConversation, isChatLoading, lastAccessToken, selectedChat } from '$lib/stores/store';

	export let topic = '';
	import FaHashtag from 'svelte-icons/fa/FaHashtag.svelte';


	async function changeChat() {
		isChatLoading.set(true);
		selectedChat.set(topic);
		const chatConversation = await JoinConversation({
			room: topic.id,
			twilioAccessToken: $lastAccessToken,
		});
		
		if (chatConversation) {
			activeConversation.set([]);
			activeConversation.set(chatConversation);
			isChatLoading.set(false);
		}
	}

</script>

    
<div on:click={changeChat} class={`dropdown-selection ${$selectedChat.friendlyName === topic.friendlyName ? 'bg-gray-400 dark:bg-neutral-600' : ''} hover:bg-gray-300 dark:hover:bg-neutral-500 py-2 px-3 mr-2 w-full dark:text-gray-500 dark:hover:text-white rounded `}>
	<FaHashtag />
	<h5 class={`dropdown-selection-text ${$selectedChat.friendlyName === topic.friendlyName ? 'text-green-400 dark:text-green-500' : ''}`}>{topic.friendlyName}</h5>
</div>
