<script>
  export let selection = ''
  import FaHashtag from 'svelte-icons/fa/FaHashtag.svelte'
</script>

<div class='dropdown-selection'>
  <FaHashtag />
  <h5 class='dropdown-selection-text'>{selection}</h5>
</div>