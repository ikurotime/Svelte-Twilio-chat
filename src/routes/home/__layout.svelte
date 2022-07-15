<script>
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
</script>

<div class="bg-neutral-700 h-full w-full flex">
	<Sidebar />
	<slot />
</div>
