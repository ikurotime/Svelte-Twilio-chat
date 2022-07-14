<script>
	// @ts-nocheck

	import StyledButton from '$lib/components/StyledButton.svelte';
	import { roomCode, user, activeConversation } from '$lib/stores/store';
	import { getTwilioAccessToken, createServer, addParticipant } from '$lib/services/chat';
	import { goto } from '$app/navigation';
	import { JoinConversation } from '$lib/services/user';
	import { supabase } from '$lib/supabaseClient';
	export let userData;

	async function handleEnterServer(e) {
		e.preventDefault();

		if (!$user || $user?.token == null || $roomCode === '') return;
		const uid = userData?.id || $user?.id;
		const token = userData?.access_token || $user?.token;
		let userIdentity;
		const { data, error } = await supabase
			.from('servers')
			.select(`friendly_name, channels(channel_sid, server_sid)`)
			.eq('friendly_name', $roomCode);
		console.log('token: ', token);
		if (token.startsWith('anonymous')) {
			userIdentity = token.split('_')[1];
			console.log(userIdentity);
		} else {
			const { data } = await supabase.auth.api.getUser(token);
			userIdentity = data.user_metadata.full_name;
		}
		await addParticipant({
			identity: userIdentity,
			room: data[0].channels[0].channel_sid,
			serverSid: data[0].channels[0].server_sid,
			uid
		});
		const { accessToken, identity } = await getTwilioAccessToken({
			token,
			serverSid: data[0].channels[0].server_sid
		});
		console.log(uid);
		const chatConversation = await JoinConversation({
			room: data[0].channels[0].channel_sid,
			twilioAccessToken: accessToken,
			identity,
			uid,
			serverSid: data[0].channels[0].server_sid
		});
		console.log(chatConversation);
		if (chatConversation) {
			activeConversation.set(chatConversation);
			goto(`/home/server/${$roomCode}`);
		}
	}
	/**
	 * @param {{ preventDefault: () => void; }} e
	 */
	async function handleCreateServer(e) {
		e.preventDefault();

		if (!$user || $user?.token == null || $roomCode === '') return;
		const access_token = userData?.access_token || $user?.token;
		const uid = userData?.id || $user?.id;
		// We pass the userToken to the server to create a new channel/server in behalf of the user.
		const { serverSid, conversation } = await createServer({
			friendlyName: $roomCode,
			uniqueName: $roomCode,
			access_token,
			uid
		});
		const token = userData?.access_token || $user?.token;
		// Channel is created so we get the Twilio access token for the user that grants access.
		const { accessToken, identity } = await getTwilioAccessToken({
			token,
			serverSid
		});
		console.log(conversation);
		console.log({
			room: conversation.sid,
			twilioAccessToken: accessToken
		});

		const chatConversation = await JoinConversation({
			room: conversation.sid,
			twilioAccessToken: accessToken,
			identity,
			uid,
			serverSid
		});
		if (chatConversation) {
			activeConversation.set(chatConversation);
			goto(`/home/server/${$roomCode}`);
		}
	}
</script>

<form
	on:submit={handleEnterServer}
	class="p-10 bg-neutral-800 rounded h-full w-full grid place-content-center gap-3 justify-items-center "
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

<form
	on:submit={handleCreateServer}
	class="p-10 bg-neutral-800 rounded h-full w-full grid place-content-center gap-3 justify-items-center "
>
	<p class="text-white">CREATE YOUR SERVER</p>
	<div class="flex gap-3">
		<input type="text" bind:value={$roomCode} class="p-3 rounded text-center" />
		<StyledButton
			text="CREATE SERVER"
			onClick={() => {}}
			type="submit"
			className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
			icon={null}
		/>
	</div>
</form>
