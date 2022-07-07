<script>
	// @ts-nocheck

	import StyledButton from '../StyledButton.svelte';
	import { roomCode, user, activeConversation } from '../../../store';
	import { getAccessToken, getServiceSid } from '../../../services/chat';
	import { goto } from '$app/navigation';
	import { createOrJoinConversation } from '../../../services/user';

	/**
	 * @param {{ preventDefault: () => void; }} e
	 */
	async function handleEnterServer(e) {
		e.preventDefault();

		if (!$user || $user?.token == null || $roomCode === '') return;
		const serviceSid = await getServiceSid({ friendlyName:$roomCode,uniqueName:$roomCode})
		const accessToken = await getAccessToken({ token: $user.token, serviceSid });
		const conversation = await createOrJoinConversation({ room: 'general', accessToken });

		if (conversation) {
			activeConversation.set(conversation);
			goto(`/home/channels/${$roomCode}`);
		}
	}
</script>

<form
	on:submit={handleEnterServer}
	class="p-10 bg-neutral-800 rounded h-96 max-w-lg w-full grid place-content-center gap-3 justify-items-center "
>
	<p class="text-white">ENTER YOUR SERVER CODE</p>
	<div class="flex gap-3">
		<input type="text" bind:value={$roomCode} class="p-3 rounded text-center" />
		<StyledButton
			text="ENTER SERVER"
			onClick={() => {}}
			type="submit"
			className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
			icon={null}
		/>
	</div>
</form>
