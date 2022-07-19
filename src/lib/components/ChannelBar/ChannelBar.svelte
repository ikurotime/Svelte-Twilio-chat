<script>
	import { session } from '$app/stores';
	import MdShare from 'svelte-icons/md/MdShare.svelte'
	import { draggable } from '@neodrag/svelte'
</script>

<div class="channel-bar shadow-lg" use:draggable={{axis: 'none',bounds: {}}}>
	<slot />
	<div class="flex items-center gap-3 text-white mt-auto px-5 py-4 border-t-2 bg-neutral-900 border-neutral-900  ">
		<img
			src={$session?.user_metadata?.avatar_url}
			class="w-8 h-8 rounded-full"
			alt={$session?.user_metadata?.full_name}
		/>
		{$session?.user_metadata?.full_name}
		<MdShare/>
	</div>
</div>
