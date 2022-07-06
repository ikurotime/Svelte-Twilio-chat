<script>
	import UserSelect from '../components/Index/UserSelect.svelte';
</script>

<svelte:head>
	<title>Miduscussion</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>

<div class="grid grid-cols-1 place-items-center h-full">
	<UserSelect />
</div>
<footer
	class="grid grid-cols-3 place-content-center text-center p-5 w-full bg-neutral-800 text-white"
>
	<p>LinkedIn</p>
	<p>Made with ❤️ by David Huertas</p>
	<p>Github</p>
</footer>
