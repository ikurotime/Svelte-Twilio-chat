<script>
	import Divider from '../Index/Divider.svelte';
	import SideBarIcon from './SideBarIcon.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	import MdHome from 'svelte-icons/md/MdHome.svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';
	import { discordUser } from '$lib/stores/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		if ($discordUser?.length === undefined) {
			goto('/home');
		}
	});
</script>

<div class="fixed top-0 left-0 h-screen w-16 flex flex-col bg-neutral-900 shadow-lg">
	<SideBarIcon id={'home'} icon={MdHome} tooltip="Home" route="/home" />
	<Divider />
	{#if $discordUser?.servers}
		{#each $discordUser.servers as server}
			<SideBarIcon
				id={server.friendly_name}
				tooltip={server.friendly_name}
				route={'/home/server/' + server.friendly_name}
				serversid={server.SID}
				channelsid={server.channels[0].channel_sid}
			/>
		{/each}
	{/if}
	<Divider />
	<SideBarIcon id={'add'} icon={MdAdd} tooltip="Add Chat" route="/home/addserver" />
	<SideBarIcon id={'settings'} icon={MdSettings} tooltip="Settings" route="/home/settings" />
</div>
