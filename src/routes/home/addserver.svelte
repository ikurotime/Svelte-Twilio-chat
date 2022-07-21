<script>
	import StyledButton from '$lib/components/StyledButton.svelte';
	import {
		roomCode,
		user,
		activeConversation,
		discordUser,
		isLoading,
		hasError,
		error,
userName,
lastAccessToken,
serverInviteLink
	} from '$lib/stores/store';
	import { getTwilioAccessToken, createServer } from '$lib/services/chat';
	import { goto } from '$app/navigation';
	import { JoinConversation } from '$lib/services/user';
	import { supabase } from '$lib/supabaseClient';
	import { ACTIVE_PAGE } from '$lib/stores/homeStore';
import { session } from '$app/stores';
	async function handleCreateServer(e) {
		e.preventDefault();
		if ($roomCode === '') return;
		if($roomCode.length > 15) {
			hasError.set(true);
			error.set("Server name is too long. Max 15 characters.");
			return;
		}
	try {
		isLoading.set(true);
		const access_token = $discordUser?.user?.access_token;
		const uid = $discordUser?.user?.id || $discordUser.user?.user?.id;
		// We pass the userToken to the server to create a new channel/server in behalf of the user.
		const res = await createServer({
			friendlyName: $roomCode,
			uniqueName: $roomCode,
			access_token,
			uid
		});
		if (res.error) {
			isLoading.set(false);
			hasError.set(true);
			error.set(res.error);
			return;
		}
		goto(`/home/server/${$roomCode}`);
		const { serverSid, conversation } = res;
		const { data } = await supabase
			.from('servers')
			.select(
				'friendly_name, id, invite_code, channels!channels_server_id_fkey(friendly_name,id,description), channel_members!inner(server_id)'
			)
			.eq('channel_members.user_id', uid);
		if ($discordUser !== undefined) {
			discordUser.update((user) => {
				user.servers = data;
				return user;
			});
		}
		serverInviteLink.set(data[0].invite_code);
		ACTIVE_PAGE.set($roomCode);

		const token = $discordUser?.user?.access_token;
		// Channel is created so we get the Twilio access token for the user that grants access.
		const { accessToken, identity } = await getTwilioAccessToken({
			token,
			serverSid
		});
		lastAccessToken.set(accessToken);
		const chatConversation = await JoinConversation({
			room: conversation.sid,
			twilioAccessToken: accessToken,
		});
		if (chatConversation) {
			activeConversation.set(chatConversation);
			isLoading.set(false);
		}
	} catch (err) {
		console.log(err);
		isLoading.set(false);
		hasError.set(true);
		error.set(err.message);
	}
	}
</script>


<div class="h-full w-full flex flex-col">
	<div class="grid place-content-end bg-gray-500 dark:bg-neutral-900 w-full">
		<div class="flex items-center gap-3 dark:text-white mt-auto px-5 py-4 ">
			<img
				src={$session?.user_metadata?.avatar_url || $user.avatar  || $discordUser?.user?.avatar || $discordUser?.avatar}
				class="w-8 h-8 rounded-full bg-white"
				alt={$session?.user_metadata?.full_name || $user.avatar || $discordUser?.user?.avatar || $discordUser?.avatar}
			/>
			{$userName || $user.username || $discordUser?.user?.username || $session?.user_metadata?.full_name}
		</div>
	</div>
<form
	on:submit={handleCreateServer}
	class="p-10 bg-gray-400 dark:bg-neutral-800 rounded h-full w-full grid place-content-center gap-3 justify-items-center "
>
	<p class="text-white">CREATE YOUR SERVER</p>
	<p class="text-white">Choose your perfect name and create your server</p>
	<div class="flex gap-3">
		<input type="text" bind:value={$roomCode} class="p-3 rounded text-center" placeholder="Awesome Server"/>
		<StyledButton
			text="CREATE SERVER"
			onClick={() => {}}
			type="submit"
			className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
			icon={null}
		/>
		
	</div>
	<a href="/home" class="text-white hover:text-green-500" on:click={()=>ACTIVE_PAGE.set('home')}>or - Enter a server</a>
</form>
</div>
