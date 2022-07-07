<script>
// @ts-nocheck

  export let header, selections;
  import TopicSelection from './TopicSelection.svelte';
  import MdAdd from 'svelte-icons/md/MdAdd.svelte'
  import ChevronIcon from './ChevronIcon.svelte';
  let expanded = false;
</script>

<div class='dropdown'>
  <div on:click={() => expanded = !expanded} class='dropdown-header'>
    <ChevronIcon />
    <h5
      class={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
    >
      {header}
    </h5>
    <MdAdd />
  </div>
  {#if expanded && selections}
  {#each selections as selection}
    <TopicSelection selection={selection} />
  {/each}
  {/if}
</div>