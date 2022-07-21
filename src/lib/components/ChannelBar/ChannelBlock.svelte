<script>
import { hasNotification, inviteCode, notification, serverInviteLink } from '$lib/stores/store';

	// @ts-nocheck
	import FaLink from 'svelte-icons/fa/FaLink.svelte'
import StyledButton from '../StyledButton.svelte';
	export let text;

	function handleClick() {
		console.log($serverInviteLink)
		hasNotification.set(true);
		notification.set('Invite link copied to clipboard. Invite Code: ' + $inviteCode);
		navigator.clipboard.writeText($serverInviteLink);
	}
</script>
	<style>
  .icon {
    width: 15px;
    height: 15px;
    border-radius: 8px;
		color: aliceblue;
    transition: all 0.2s ease-in-out;
  }
  .icon:hover {
    background-color: #636363;
  }
</style>

<div class="channel-block">
	<h5 class="channel-block-text">{text}</h5>

	<StyledButton
		onClick={handleClick}
		text="Invite Link"
		className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm mr-auto"
		icon={null}
	/>
	
	<!-- <MdSettings /> -->
</div>
