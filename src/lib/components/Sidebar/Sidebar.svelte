<script>
	import Divider from '../Index/Divider.svelte';
	import SideBarIcon from './SideBarIcon.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	import MdHome from 'svelte-icons/md/MdHome.svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';
	import { joinedServers } from '$lib/stores/store';
</script>

<div class="fixed top-0 left-0 h-screen w-16 flex flex-col bg-neutral-900 shadow-lg">
	<SideBarIcon id={'home'} icon={MdHome} tooltip="Home" route="/home" />
	<Divider />
	{#each $joinedServers as server}
		<SideBarIcon
			id={server.friendly_name}
			tooltip={server.friendly_name}
			route={'/home/server/' + server.friendly_name}
			serversid={server.SID}
			channelsid={server.channels[0].channel_sid}
		/>
	{/each}
	<SideBarIcon id={'add'} icon={MdAdd} tooltip="Add Chat" route="/home/addserver" />
	<Divider />
	<SideBarIcon id={'settings'} icon={MdSettings} tooltip="Settings" route="/home/settings" />
</div>
