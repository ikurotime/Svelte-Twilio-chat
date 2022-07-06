<script>
import Sidebar from "../../components/Sidebar.svelte";

import JoinRoom from "../../components/Index/JoinRoom.svelte";

</script>
<svelte:head>
	<title>Home | Miduscussion</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>
<div class="bg-neutral-700 h-full w-full flex">
  <Sidebar/>
  <JoinRoom />
</div>
