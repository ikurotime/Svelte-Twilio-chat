<script>
	import { EmojiButton } from '@joeattardi/emoji-button';
	import { createEventDispatcher } from 'svelte';
	import MdInsertEmoticon from 'svelte-icons/md/MdInsertEmoticon.svelte';

	const dispatch = createEventDispatcher();

	const picker = new EmojiButton({ theme: 'auto', position: 'top-start' });
	let trigger;

	picker.on('emoji', (selection) => {
		dispatch('change', selection);
	});

	function togglePicker() {
		picker.togglePicker(trigger);
	}
</script>

<button class="icon" bind:this={trigger} on:click={togglePicker}>
	<MdInsertEmoticon />
</button>

<style>
	.icon {
		cursor: pointer;
		width: 40px;
		height: 40px;
		border-radius: 20%;
		border: solid 1px #636363;
		padding: 5px;
		transition: all 0.2s ease-in-out;
	}
	.icon:hover {
		background-color: #636363;
	}
</style>
