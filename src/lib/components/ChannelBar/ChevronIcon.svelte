<script>
	export let expanded;
	import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte';
	import FaChevronRight from 'svelte-icons/fa/FaChevronRight.svelte';
</script>

{#if expanded}
	<FaChevronDown />
{:else}
	<FaChevronRight />
{/if}
