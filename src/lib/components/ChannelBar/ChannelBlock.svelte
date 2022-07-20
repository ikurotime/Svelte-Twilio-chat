<script>
	// @ts-nocheck
	import MdShare from 'svelte-icons/md/MdShare.svelte'
	export let text;
</script>
	<style>
  .icon {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 20%;
    border: solid 1px #636363;
		color: aliceblue;
    padding: 5px;
    transition: all 0.2s ease-in-out;
		margin-right: auto;
  }
  .icon:hover {
    background-color: #636363;
  }
</style>

<div class="channel-block">
	<h5 class="channel-block-text">{text}</h5>
	<button class="icon">
		<MdShare/>
	</button>
	<!-- <MdSettings /> -->
</div>
