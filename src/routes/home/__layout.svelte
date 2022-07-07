<script>
import Sidebar from "$lib/components/Sidebar/Sidebar.svelte";

</script>
<svelte:head>
	<title>Home | Miduscussion</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>
<div class="bg-neutral-700 h-full w-full flex">
  <Sidebar/>
  <slot/>
</div>
