<script>
import { serverInviteLink } from '$lib/stores/store';

	// @ts-nocheck
	import FaLink from 'svelte-icons/fa/FaLink.svelte'
	export let text;
</script>
	<style>
  .icon {
    width: 15px;
    height: 15px;
    border-radius: 8px;
		color: aliceblue;
    transition: all 0.2s ease-in-out;
  }
  .icon:hover {
    background-color: #636363;
  }
</style>

<div class="channel-block">
	<h5 class="channel-block-text">{text}</h5>
	<button on:click={() => console.log($serverInviteLink)} class="flex flex-row border rounded border-[#636363] items-center text-white mr-auto px-2 py-1 hover:bg-[#636363] gap-2 cursor-pointer">
		<div class="icon">
			<FaLink/>
		</div>
		<p>Invite</p>
	</button>
	
	<!-- <MdSettings /> -->
</div>
