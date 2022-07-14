<script>
  import { goto } from "$app/navigation";
  import { ACTIVE_PAGE } from "$lib/stores/homeStore";
  export let icon,tooltip,route,id;

  function handleClick() {
    if (route) {
      goto(route);
      ACTIVE_PAGE.set(id);
    }
  }
</script>

<a id={id} class={`${id === $ACTIVE_PAGE ? 'sidebar-icon-active' : 'sidebar-icon'} group `} on:click={() => handleClick(route)}>
 <svelte:component this={icon}/>
  <span class="sidebar-tooltip group-hover:scale-100 group-hover:opacity-100">
    {tooltip}
  </span>
</a>