<script>
import { expanded } from "$lib/stores/channelStore";
import FaChevronDown from 'svelte-icons/fa/FaChevronDown.svelte'
import FaChevronRight from 'svelte-icons/fa/FaChevronRight.svelte'
   const chevClass = 'text-accent text-opacity-80 my-auto mr-1';
</script>


{#if expanded}
<FaChevronDown size='24' class={chevClass} />
{:else}
<FaChevronRight size='24' class={chevClass} />
{/if}


