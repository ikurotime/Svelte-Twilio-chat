<script>
	import StyledButton from '$lib/components/StyledButton.svelte';
	import { signOut } from '$lib/supabaseClient';
</script>

<div
	class="p-10 bg-neutral-800 rounded h-full w-full grid place-content-center gap-3 justify-items-center "
>
	<p class="text-white">SIGN OUT</p>
	<div class="flex gap-3">
		<StyledButton
			text="SignOut"
			onClick={signOut}
			type="button"
			className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
			icon={null}
		/>
	</div>
</div>
