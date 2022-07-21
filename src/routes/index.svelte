<script>
	import Header from '$lib/components/Index/Header.svelte';
import UserSelect from '$lib/components/Index/UserSelect.svelte';

</script>

<svelte:head>
	<title>TechTalks</title>
	<meta name="description" content="El chat de discusion de temas de programacion!" />
</svelte:head>

<Header/>
<div class="grid grid-cols-1 place-items-center h-full">
	<UserSelect />
</div>
<footer
	class="grid grid-cols-3 place-content-center text-center p-5 w-full bg-neutral-800 text-white"
>
	<a href="https://www.linkedin.com/in/david-huertas-ortiz/" target="_blank">LinkedIn</a>
	<p>Made with ❤️ by <a href="https://davidhuertas.dev" target="_blank">David Huertas</a></p>
	<a href="https://github.com/ikurotime" target="_blank">Github</a>
</footer>
