<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  export let icon,tooltip,route;
</script>

<div class="sidebar-icon group" on:click={() => route ? goto(route) : {}}>
 <svelte:component this={icon}/>
  <span class="sidebar-tooltip group-hover:scale-100">
    {tooltip}
  </span>
</div>