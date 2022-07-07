<script>
// @ts-nocheck
  export let icon,tooltip;
</script>

<div class="sidebar-icon group">
 <svelte:component this={icon}/>
  <span class="sidebar-tooltip group-hover:scale-100">
    {tooltip}
  </span>
</div>