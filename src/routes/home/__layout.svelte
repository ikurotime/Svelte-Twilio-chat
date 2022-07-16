<script>
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import { userName } from '$lib/stores/store';
	import { session } from '$app/stores';
	import { onMount } from 'svelte';
	onMount(() => {
		if (!$userName) {
			userName.set($session.user_metadata.full_name);
		}
	});
</script>

<div class="bg-neutral-700 h-full w-full flex">
	<Sidebar />
	<slot />
</div>
