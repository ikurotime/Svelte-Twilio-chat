<script>
	export let header;
	import { topics } from '$lib/stores/store';
	import TopicSelection from './TopicSelection.svelte';
	import MdAdd from 'svelte-icons/md/MdAdd.svelte';
	import ChevronIcon from './ChevronIcon.svelte';
	let expanded = true;
</script>

<div class="dropdown">
	<div class="dropdown-header">
		<ChevronIcon {expanded} />
		<h5 class={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}>
			{header}
		</h5>
	</div>
</div>
{#if expanded && $topics}
	{#each $topics as topic}
		<TopicSelection {topic} />
	{/each}
{/if}
