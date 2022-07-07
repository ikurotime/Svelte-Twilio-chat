<script>
  export let selection = ''
  import FaHashtag from 'svelte-icons/fa/FaHashtag.svelte'
</script>

<div class='dropdown-selection'>
  <FaHashtag size='24' class='text-gray-400' />
  <h5 class='dropdown-selection-text'>{selection}</h5>
</div>