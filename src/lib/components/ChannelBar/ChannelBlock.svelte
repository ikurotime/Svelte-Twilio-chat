<script>
	import { hasNotification, inviteCode, notification, serverInviteLink } from '$lib/stores/store';
	import StyledButton from '../StyledButton.svelte';
	export let text;

	/* 	function handleClick() {
		deleteServer({
			serverSid: $currentServerData.id,
		});
		goto('/home')
	} */
	function handleClick() {
		hasNotification.set(true);
		notification.set('Invite link copied to clipboard. Invite Code: ' + $inviteCode);
		navigator.clipboard.writeText($serverInviteLink);
	}
</script>

<div class="channel-block">
	<h5 class="channel-block-text">{text}</h5>

	<StyledButton
		onClick={handleClick}
		text="Invite Link"
		className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm mr-auto "
		icon={null}
	/>
	<!-- In order to work, it's needed to implant a recognition of the user that created the server.
		 I have no time to do it, so im going to leave it as a TODO. 
		 <StyledButton
		onClick={handleClick}
		text="Delete"
		className="text-slate-800 bg-red-300 shadow-[0_5px_0_#e67575] p-2 rounded-xl text-sm mr-auto"
		icon={null}
	/> -->
</div>
