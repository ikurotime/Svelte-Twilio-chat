<script>
	// @ts-nocheck

	import StyledButton from '../StyledButton.svelte';
	import { isJoinRoom, roomCode, user, activeConversation } from '../../store';
	import { getAccessToken } from '../../services/chat';
	import { goto } from '$app/navigation';
	import { createOrJoinConversation } from '../../services/user';

	/**
	 * @param {{ preventDefault: () => void; }} e
	 */
	async function handleEnterRoom(e) {
		e.preventDefault();

		if (!$user || $user?.token == null || $roomCode === '') return;

		const accessToken = await getAccessToken({ token: $user.token });
		const conversation = await createOrJoinConversation({ room: $roomCode, accessToken });

		if (conversation) {
			activeConversation.set(conversation);
			goto(`/room/${$roomCode}`);
		}
	}
</script>

<form
	on:submit={handleEnterRoom}
	class="p-10 bg-neutral-800 rounded h-96 max-w-lg w-full grid place-content-center gap-3 justify-items-center "
>
	<p class="text-white">ENTER YOUR ROOM CODE</p>
	<div class="flex gap-3">
		<input type="text" bind:value={$roomCode} class="p-3 rounded text-center" />
		<StyledButton
			text="ENTER ROOM"
			onClick={() => {}}
			type="submit"
			className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
			icon={null}
		/>
	</div>
	<StyledButton
		text="GO BACK"
		onClick={() => {
			isJoinRoom.set(false);
		}}
		type="button"
		className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
		icon={null}
		/>
</form>
