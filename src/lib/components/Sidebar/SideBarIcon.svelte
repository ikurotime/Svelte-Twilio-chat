<script>
	import { goto } from '$app/navigation';
	import { getTwilioAccessToken } from '$lib/services/chat';
	import {
		activeConversation,
		activeChat,
		discordUser,
		isLoading,
		user,
		lastAccessToken
	} from '$lib/stores/store';
	import { ACTIVE_PAGE } from '$lib/stores/homeStore';
	import { JoinConversation } from '$lib/services/user';
	export let icon, tooltip, route, id, serversid, channelsid;

	async function handleClick() {
		isLoading.set(true);
		const token = $discordUser?.user?.access_token;
		const uid = $discordUser?.user?.id || $discordUser?.user?.user?.id;
		if (route) {
			goto(route, { replaceState: true });
			ACTIVE_PAGE.set(id);
		}
		if (serversid) {
			const { accessToken, identity } = await getTwilioAccessToken({
				token,
				serverSid: serversid
			});
			lastAccessToken.set(accessToken);
			const chatConversation = await JoinConversation({
				room: channelsid,
				twilioAccessToken: accessToken
			});
			if (chatConversation) {
				activeConversation.set(null);
				activeConversation.set(chatConversation);
			}
		}
		isLoading.set(false);
	}
</script>

<a
	{id}
	class={`${id === $ACTIVE_PAGE ? 'sidebar-icon-active' : 'sidebar-icon'} group `}
	on:click={() => handleClick(route)}
>
	{#if icon}
		<svelte:component this={icon} />
	{:else}
		{id[0].toUpperCase()}
	{/if}
	<span class="sidebar-tooltip group-hover:scale-100 group-hover:opacity-100">
		{tooltip}
	</span>
</a>
