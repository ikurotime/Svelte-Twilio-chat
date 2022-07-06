<script>
	import Header from '../components/Index/Header.svelte';
	import '../app.css';
</script>

<div class="flex flex-col h-screen ">
	<main class="h-full flex flex-col justify-center items-center bg-picture bg-cover bg-bottom bg-fixed  overflow-y-scroll">
	<slot />
</main>
</div>
