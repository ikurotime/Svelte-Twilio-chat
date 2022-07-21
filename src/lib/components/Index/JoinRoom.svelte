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
		error,
		serverInviteLink,
		lastAccessToken
	} from '$lib/stores/store';
	import { getTwilioAccessToken, addParticipant } from '$lib/services/chat';
	import { goto } from '$app/navigation';
	import { JoinConversation } from '$lib/services/user';
	import { supabase } from '$lib/supabaseClient';
	import { draggable } from '@neodrag/svelte';
	import MdShare from 'svelte-icons/md/MdShare.svelte';
	import { page, session } from '$app/stores';
	import { ACTIVE_PAGE } from '$lib/stores/homeStore';
	let innerWidth = window.innerWidth;

	async function handleEnterServer(e) {
		e.preventDefault();
		if ($roomCode === '') return;
		isLoading.set(true);
		try {
			const uid = $discordUser?.user?.id || $discordUser?.user?.user?.id || $user?.id;
			const token = $discordUser?.user?.access_token || $user?.access_token;

			let userIdentity;
			const { data } = await supabase
				.from('servers')
				.select(`id,friendly_name, channels!channels_server_id_fkey(id, server_id,description)`)
				.eq('invite_code', $roomCode);

			if (data?.length === 0) {
				goto(`/home`);
				isLoading.set(false);
				hasError.set(true);
				error.set("Server doesn't exist");
				return;
			}
			goto(`/home/server/${data[0].friendly_name}`);

			if (token.startsWith('anonymous')) {
				userIdentity = token.split('anonymous_')[1];
			} else {
				const { data } = await supabase.auth.api.getUser(token);
				userIdentity = data?.user_metadata.full_name;
				userName.set(userIdentity);
			}
			await addParticipant({
				identity: userIdentity,
				room: data[0].channels[0].id,
				serverSid: data[0].channels[0].server_id,
				uid
			});
			const { accessToken, identity } = await getTwilioAccessToken({
				token,
				serverSid: data[0].channels[0].server_id
			});
			lastAccessToken.set(accessToken);
			const chatConversation = await JoinConversation({
				room: data[0].channels[0].id,
				twilioAccessToken: accessToken
			});
			const resp = await supabase
				.from('servers')
				.select(
					'friendly_name, id,invite_code,channels!channels_server_id_fkey(friendly_name,id,description), channel_members!inner(server_id)'
				)
				.eq('channel_members.user_id', uid);
			discordUser.update((user) => {
				user.servers = resp?.data;
				return user;
			});
			if (chatConversation) {
				activeConversation.set(chatConversation);
				ACTIVE_PAGE.set(data[0]?.friendly_name);
				isLoading.set(false);
			}
		} catch (err) {
			console.log(err);
			goto(`/home`);
			isLoading.set(false);
			hasError.set(true);
			error.set(err.message);
		}
		isLoading.set(false);
	}
</script>

{#if innerWidth < 640}
	<div class="w-full" use:draggable={{ axis: 'x', bounds: { right: -64 } }}>
		<form
			on:submit={handleEnterServer}
			class={`${
				innerWidth > 640 ? '' : 'handle'
			} p-10 bg-neutral-800  h-full w-full grid place-content-center gap-3 justify-items-center `}
		>
			<p class="text-white">ENTER YOUR SERVER CODE</p>
			<p class="text-white">To join a Server, introduce a server code if you have one.</p>
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
	</div>
{:else}
	<div class="h-full w-full flex flex-col">
		<div class="grid place-content-end bg-gray-500 dark:bg-neutral-900 w-full">
			<div class="flex items-center gap-3 dark:text-white mt-auto px-5 py-4 ">
				<img
					src={$session?.user_metadata?.avatar_url ||
						$user.avatar ||
						$discordUser?.user?.avatar ||
						$discordUser?.avatar}
					class="w-8 h-8 rounded-full bg-white"
					alt={$session?.user_metadata?.full_name ||
						$user.avatar ||
						$discordUser?.user?.avatar ||
						$discordUser?.avatar}
				/>
				{$userName ||
					$user.username ||
					$discordUser?.user?.username ||
					$session?.user_metadata?.full_name}
			</div>
		</div>
		<form
			on:submit={handleEnterServer}
			class={`p-10 bg-gray-400 dark:bg-neutral-800  h-full w-full grid place-content-center gap-3 justify-items-center `}
		>
			<p class="text-white">ENTER YOUR SERVER CODE</p>
			<p class="text-white">To join a Server, introduce a server code if you have one.</p>

			<div class="flex gap-3">
				<input
					type="text"
					bind:value={$roomCode}
					class="p-3 rounded text-center"
					placeholder="XXXXXXXXX"
				/>
				<StyledButton
					text="ENTER SERVER"
					onClick={() => {}}
					type="submit"
					className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
					icon={null}
				/>
			</div>
			<a
				href="/home/addserver"
				class="text-white hover:text-green-500"
				on:click={() => ACTIVE_PAGE.set('add')}>or - Create a server</a
			>
		</form>
	</div>
{/if}
<svelte:window bind:innerWidth />
