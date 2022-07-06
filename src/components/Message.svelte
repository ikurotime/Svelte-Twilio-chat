<script>
	// @ts-nocheck

	import { user } from '../store';

	export let message = { body, author };
	const { body, author } = message;
</script>

<div class="m-2 w-3/6">
	<p class="m-0 p-0">
		{body}
	</p>
	<small class="text-xs">{author}</small>
</div>
