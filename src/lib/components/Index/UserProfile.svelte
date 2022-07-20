<script>
	import Avatar from '../../../images/anonymous.png';
	import { discordUser, user, userName } from '$lib/stores/store';
</script>

<div class="flex justify-center text-end items-center">
	<span class="ml-2 text-sm  w-36 mx-3">
		{#if $discordUser?.username !== ''}
			{$discordUser?.username}
		{:else}
			ANONYMOUS
		{/if}
	</span>
	<img
		src={$discordUser?.avatar !== '' ? $discordUser?.avatar : Avatar}
		class="w-8 h-8 rounded-full bg-white"
		alt={$discordUser?.username}
	/>
</div>
