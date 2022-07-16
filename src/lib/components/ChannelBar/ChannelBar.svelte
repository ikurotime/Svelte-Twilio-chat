<script>
	import { session } from '$app/stores';
</script>

<div class="channel-bar shadow-lg">
	<slot />
	<div class="flex items-center gap-3 text-white mt-auto px-5 py-3 border-t-2 border-slate-900">
		<img
			src={$session?.user_metadata?.avatar_url}
			class="w-8 h-8 rounded-full"
			alt={$session?.user_metadata?.full_name}
		/>
		{$session?.user_metadata?.full_name}
	</div>
</div>
