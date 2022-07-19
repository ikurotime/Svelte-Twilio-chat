<script>
	import { error, hasError } from '$lib/stores/store';
	import { afterUpdate, onMount } from 'svelte';

	const hideError = () => {
		hasError.set(false);
	};
	afterUpdate(() => {
		setTimeout(() => {
			hideError();
		}, 5000);
	});
</script>

<div
	class={`absolute right-5 top-5 bg-red-600 shadow-lg mx-auto w-48 md:w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3 transition-all ${
		$hasError ? 'opacity-1' : 'opacity-0'
	} `}
	id="static-example"
	role="alert"
	aria-live="assertive"
	aria-atomic="true"
	data-mdb-autohide="false"
>
	<div
		class="bg-red-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-red-500 rounded-lg"
	>
		<p class="font-bold text-white flex items-center">
			<svg
				aria-hidden="true"
				focusable="false"
				data-prefix="fas"
				data-icon="times-circle"
				class="w-4 h-4 mr-2 fill-current"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<path
					fill="currentColor"
					d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
				/>
			</svg>
			{$error}
		</p>
		<div class="flex items-center">
			<button
				on:click={hideError}
				type="button"
				class="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
				data-mdb-dismiss="toast"
				aria-label="Close"
			/>
		</div>
	</div>
</div>
