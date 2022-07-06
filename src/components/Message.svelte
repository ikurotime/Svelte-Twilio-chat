<script>
	// @ts-nocheck

	import { user,userName} from '../store';

	export let message = { body, author };
	const { body, author } = message;

	let userOrigin = author === $userName ? 'text-end' : 'text-start';
</script>

<div class={`m-2  ${userOrigin}`} >
	<small class="text-xs">{author}</small>
	<p class="m-0 p-0">
		{body}
	</p>
</div>
