<script>
	import Avatar from '../../../images/anonymous.png';
	import { discordUser, user, userName } from '$lib/stores/store';
	import { session } from '$app/stores';
</script>

<div class="flex justify-center text-end items-center col-start-3">
	<span class="ml-2 text-sm  w-36 mx-3">
		{$discordUser?.username ||
			$user?.username ||
			$userName ||
			$session?.user_metadata.full_name ||
			'Anonymous'}
	</span>
	<img
		src={$discordUser?.avatar ||
			$discordUser?.user?.avatar ||
			$user?.avatar ||
			$session?.user_metadata?.avatar_url ||
			Avatar}
		class="w-8 h-8 rounded-full bg-white"
		alt={$discordUser?.username}
	/>
</div>
