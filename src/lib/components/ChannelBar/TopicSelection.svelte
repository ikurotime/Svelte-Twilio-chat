<script>
	export let topic = '';
	import FaHashtag from 'svelte-icons/fa/FaHashtag.svelte';
</script>

<div class="dropdown-selection">
	<FaHashtag />
	<h5 class="dropdown-selection-text">{topic}</h5>
</div>
