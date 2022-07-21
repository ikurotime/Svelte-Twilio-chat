<script>
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import { user, userName } from '$lib/stores/store';
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	onMount(() => {
		if (!$userName) {
			userName.set($session?.user_metadata?.full_name);
		}
	});
</script>

<div class="bg-gray-500 dark:bg-neutral-800 h-full w-full flex">
	<Sidebar />
	<slot />
</div>
