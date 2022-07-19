<script>
	import { userName } from '$lib/stores/store';

	export let body, author;
	let userOrigin =
		author === $userName ? ' place-self-end ' : 'text-start ';
</script>

<div class={`m-2 w-fit ${userOrigin} rounded px-3 pb-2`}>
	<small class="text-xs text-white">{author}</small>
	<p class="m-0 p-0 text-white">
		{body}
	</p>
</div>
