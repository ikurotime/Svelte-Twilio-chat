<script>
import LoadingScreen from '$lib/components/LoadingScreen.svelte';

	import { isLoading} from '$lib/stores/store';

</script>

{#if $isLoading}
	<LoadingScreen bgColor="bg-gray-400"/>
{:else}
	<slot />
{/if}
