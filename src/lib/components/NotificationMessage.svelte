<script>
	import { notification, hasNotification } from '$lib/stores/store';

	const hideError = () => {
		hasNotification.set(false);
	};
</script>

<div
	class={`absolute right-5 top-5 bg-green-600 shadow-lg mx-auto w-48 md:w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3 transition-all ${
		$hasNotification ? 'opacity-1' : 'opacity-0'
	} `}
	id="static-example"
	role="alert"
	aria-live="assertive"
	aria-atomic="true"
	data-mdb-autohide="false"
>
	<div
		class="bg-green-600 flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-green-500 rounded-lg"
	>
		<p class="font-bold text-white flex items-center">
			{$notification}
		</p>
		<div class="flex items-center">
			<button
				on:click={hideError}
				type="button"
				class="btn-close btn-close-white box-content w-4 h-4 ml-2 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
				data-mdb-dismiss="toast"
				aria-label="Close">X</button
			>
		</div>
	</div>
</div>
