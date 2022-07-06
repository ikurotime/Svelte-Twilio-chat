<script>
	// @ts-nocheck
	export let text = '';
	export let className = '';
	export let onClick;
	export let type;
	export let icon;
</script>

<button
	class={`${className} active:shadow-none active:translate-y-1 px-3 transition-all`}
	on:click={onClick}
	{type}
>
	<div class="flex flex-row gap-3  items-center">
		{text}
		{#if icon !== null}
			<img class="w-7 h-7" src={icon} alt="random" />
		{/if}
	</div>
</button>
