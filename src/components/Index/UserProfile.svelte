<script>
  import Avatar from "../../images/anonymous.png"
  import { user,userName } from "../../store"
</script>

<div class="flex justify-center text-end items-center">
  <span class="ml-2 text-sm text-gray-500 w-36 mx-3">
    {#if $userName !== ""}
    {$userName}
    {:else}
    ANONYMOUS
    {/if}
  </span>
  <img src={$user.avatar !== '' ? $user?.avatar : Avatar} class="w-10 h-10 rounded-full" alt={$user?.username}/>
</div>