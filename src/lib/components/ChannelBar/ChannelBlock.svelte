<script>
import { goto } from '$app/navigation';
import { deleteServer } from '$lib/services/chat';

import { currentServerData} from '$lib/stores/store';
import StyledButton from '../StyledButton.svelte';
	export let text;

	function handleClick() {
		deleteServer({
			serverSid: $currentServerData.id,
		});
		goto('/home')
	}
</script>

<div class="channel-block">
	<h5 class="channel-block-text">{text}</h5>

	<StyledButton
		onClick={handleClick}
		text="Delete"
		className="text-slate-800 bg-red-300 shadow-[0_5px_0_#e67575] p-2 rounded-xl text-sm mr-auto"
		icon={null}
	/>
	
</div>
