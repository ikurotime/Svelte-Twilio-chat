<script>
	import StyledButton from '$lib/components/StyledButton.svelte';
	import { roomCode, user, activeConversation, discordUser, isLoading } from '$lib/stores/store';
	import { getTwilioAccessToken, createServer } from '$lib/services/chat';
	import { goto } from '$app/navigation';
	import { JoinConversation } from '$lib/services/user';
	import { supabase } from '$lib/supabaseClient';
	import { ACTIVE_PAGE } from '$lib/stores/homeStore';
	async function handleCreateServer(e) {
		e.preventDefault();
		isLoading.set(true);
		goto(`/home/server/${$roomCode}`);

		if (!$user || $user?.token == null || $roomCode === '') return;
		const access_token = $discordUser?.access_token || $user?.token;
		const uid = $discordUser?.id || $user?.id;
		// We pass the userToken to the server to create a new channel/server in behalf of the user.
		const { serverSid, conversation } = await createServer({
			friendlyName: $roomCode,
			uniqueName: $roomCode,
			access_token,
			uid
		});
		const { data } = await supabase
			.from('servers')
			.select('friendly_name, SID, channels(channel_friendly_name, channel_sid)');
		if ($discordUser) {
			discordUser.update((user) => {
				user.servers = data;
				return user;
			});
		}

		ACTIVE_PAGE.set($roomCode);

		const token = $discordUser?.access_token || $user?.token;
		// Channel is created so we get the Twilio access token for the user that grants access.
		const { accessToken, identity } = await getTwilioAccessToken({
			token,
			serverSid
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
			isLoading.set(false);
		}
	}
</script>

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
