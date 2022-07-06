<script>
	import { isJoinRoom } from '../../store';
	import IndexTabs from '../Index/IndexTabs.svelte';
	import JoinRoom from './JoinRoom.svelte';
	import UserSelectPanel from './UserSelectPanel.svelte';
</script>

<div class="max-w-lg w-full">
	{#if $isJoinRoom}
		<JoinRoom />
	{:else}
		<UserSelectPanel />
	{/if}
</div>
