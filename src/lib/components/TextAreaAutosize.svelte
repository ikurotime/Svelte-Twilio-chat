<script>
	export let value = '';
	export let minRows = 1;
	export let maxRows;
	export let classes;
	export let currentChatname;
	export let handleKeyDown;
	$: minHeight = `${1 + minRows * 1.2}em`;
	$: maxHeight = maxRows ? `${1 + maxRows * 1.2}em` : `auto`;
</script>

<div class="container">
	<pre aria-hidden="true" style="min-height: {minHeight}; max-height: {maxHeight} ">{value +
			'\n'}</pre>

	<textarea
		on:keydown={handleKeyDown}
		placeholder="Send a message to {currentChatname}"
		bind:value
		class="{classes} focus:outline-none px-3"
	/>
</div>

<style>
	.container {
		position: relative;
	}

	pre,
	textarea {
		font-family: inherit;
		padding: 0.5em;
		box-sizing: border-box;
		line-height: 1.2;
		overflow: hidden;
	}

	textarea {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		resize: none;
	}
</style>
