<script>
	import Avatar from '../../../images/anonymous.png';
	import { user, userName } from '../../../store';
</script>

<div class="flex justify-center text-end items-center">
	<span class="ml-2 text-sm  w-36 mx-3">
		{#if $userName !== ''}
			{$userName}
		{:else}
			ANONYMOUS
		{/if}
	</span>
	<img
		src={$user.avatar !== '' ? $user?.avatar : Avatar}
		class="w-8 h-8 rounded-full bg-white"
		alt={$user?.username}
	/>
</div>
