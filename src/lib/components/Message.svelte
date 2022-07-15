<script>
	// @ts-nocheck

	import { userName } from '$lib/stores/store';

	export let body, author;

	let userOrigin =
		author === $userName ? 'text-end place-self-end bg-neutral-400' : 'text-start bg-neutral-700';
</script>

<div class={`m-2 w-fit ${userOrigin} rounded px-3 pb-2`}>
	<small class="text-xs">{author}</small>
	<p class="m-0 p-0 text-white">
		{body}
	</p>
</div>
