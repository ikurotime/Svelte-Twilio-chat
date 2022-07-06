<script>
	import Header from '../components/Index/Header.svelte';
	import '../app.css';
</script>

<Header />
<main
	class="h-full flex flex-col justify-center items-center bg-picture bg-cover bg-bottom bg-fixed"
>
	<div class=" mx-3  rounded-lg max-w-7xl h-full max-h-[80vh] p-3 w-full flex flex-col ">
		<slot />
	</div>
</main>

<footer class="grid place-content-center p-5 bg-neutral-800 text-white">
	<p>Made with ❤️ by David Huertas</p>
</footer>
