<script>
	import { session } from '$app/stores';
	import { draggable } from '@neodrag/svelte'
import { user } from '$lib/stores/store';
</script>

<div class="channel-bar shadow-lg" use:draggable={{axis: 'none',bounds: {}}}>
	<slot />
	<div class="flex items-center gap-3 text-white mt-auto px-5 py-4 bg-neutral-900   ">
		<img
			src={$session?.user_metadata?.avatar_url || $user.avatar}
			class="w-8 h-8 rounded-full"
			alt={$session?.user_metadata?.full_name || $user.avatar}
		/>
		{$session?.user_metadata?.full_name || $user.username}

	</div>
</div>
