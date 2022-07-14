<script>
	import Divider from '../Index/Divider.svelte';
	import SideBarIcon from './SideBarIcon.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	import MdHome from 'svelte-icons/md/MdHome.svelte';
	import MdSettings from 'svelte-icons/md/MdSettings.svelte';
</script>

<div class="fixed top-0 left-0 h-screen w-16 flex flex-col bg-neutral-900 shadow-lg">
	<SideBarIcon id={'home'} icon={MdHome} tooltip="Home" route="/home" />
	<Divider />
	<SideBarIcon id={'chat1'} icon={MdAdd} tooltip="Chat 1" route="/home/server/1" />
	<SideBarIcon id={'add'} icon={MdAdd} tooltip="Add Chat" />
	<Divider />
	<SideBarIcon id={'settings'} icon={MdSettings} tooltip="Settings" route="/home/settings" />
</div>
