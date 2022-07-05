<script>
// @ts-nocheck
   export let text = "";
   export let className= "";
   export let onClick;
   export let type;
</script>
<button class={`${className} active:shadow-none active:translate-y-1`} on:click={onClick} type={type}>{text}</button>
