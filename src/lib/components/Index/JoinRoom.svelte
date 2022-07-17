<script>
	// @ts-nocheck

	import StyledButton from '$lib/components/StyledButton.svelte';
	import {
		roomCode,
		user,
		activeConversation,
		userName,
		discordUser,
		isLoading,
		hasError,
		error
	} from '$lib/stores/store';
	import { getTwilioAccessToken, addParticipant } from '$lib/services/chat';
	import { goto } from '$app/navigation';
	import { JoinConversation } from '$lib/services/user';
	import { supabase } from '$lib/supabaseClient';

	async function handleEnterServer(e) {
		e.preventDefault();
		if (!$user || $user?.token == null || $roomCode === '') return;
		isLoading.set(true);
		const uid = $discordUser?.id || $user?.id;
		const token = $discordUser?.access_token || $user?.token;
		let userIdentity;
		const { data } = await supabase
			.from('servers')
			.select(`friendly_name, channels!channels_server_id_fkey(id, server_id,description)`)
			.eq('friendly_name', $roomCode);
		//console.log(data);
		if (data?.length === 0) {
			goto(`/home`);
			isLoading.set(false);
			hasError.set(true);
			error.set("Server doesn't exist");
			return;
		}
		goto(`/home/server/${$roomCode}`);
		if (token.startsWith('anonymous')) {
			userIdentity = token.split('_')[1];
		} else {
			const { data } = await supabase.auth.api.getUser(token);
			userIdentity = data?.user_metadata.full_name;
			userName.set(userIdentity);
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
		const chatConversation = await JoinConversation({
			room: data[0].channels[0].channel_sid,
			twilioAccessToken: accessToken,
			identity,
			uid,
			serverSid: data[0].channels[0].server_sid
		});
		if (!$discordUser) {
		}
		if (chatConversation) {
			activeConversation.set(chatConversation);
			isLoading.set(false);
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
