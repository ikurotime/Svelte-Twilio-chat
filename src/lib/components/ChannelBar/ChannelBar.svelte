<script>
	import { session } from '$app/stores';
	import { draggable } from '@neodrag/svelte'
import { discordUser, user } from '$lib/stores/store';
import { hasNotification, inviteCode, notification, serverInviteLink } from '$lib/stores/store';

import StyledButton from '../StyledButton.svelte';
function handleClick() {
		hasNotification.set(true);
		notification.set('Invite link copied to clipboard. Invite Code: ' + $inviteCode);
		navigator.clipboard.writeText($serverInviteLink);
	}
</script>

<div class="channel-bar shadow-lg" use:draggable={{axis: 'none',bounds: {}}}>
	<slot />
	<div class="flex items-center gap-3 text-white mt-auto px-5 py-4 bg-gray-600 dark:bg-neutral-900   ">
		<img
			src={$session?.user_metadata?.avatar_url ||  $user.avatar || $discordUser?.user?.avatar}
			class="w-8 h-8 rounded-full bg-white"
			alt={$session?.user_metadata?.full_name || $user.avatar || $discordUser?.user?.avatar}
		/>
		{$session?.user_metadata?.full_name ||  $user.username || $discordUser?.user?.username}

		<StyledButton
		onClick={handleClick}
		text="Invite Link"
		className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm "
		icon={null}
		/>
	</div>
</div>
