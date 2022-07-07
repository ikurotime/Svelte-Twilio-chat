<script>
	import { ACTIVE_TAB, FIRST_TAB, SECOND_TAB, selectedTab, UNACTIVE_TAB } from '$lib/stores/store';
	/**
	 * @param {string} tab
	 */
	function changeSelectedTab(tab) {
		selectedTab.update((selectedTab) => {
			return tab;
		});
	}
</script>

<ul
	class="flex flex-wrap text-sm font-medium text-center text-gray-500  border-gray-200 dark:text-gray-400"
>
	<li class="mr-2 hover:cursor-pointer">
		<span
			on:click={() => changeSelectedTab(FIRST_TAB)}
			class={$selectedTab === FIRST_TAB ? ACTIVE_TAB : UNACTIVE_TAB}>ANONYMOUS</span
		>
	</li>
	<li class="mr-2 hover:cursor-pointer">
		<span
			on:click={() => changeSelectedTab(SECOND_TAB)}
			class={$selectedTab === SECOND_TAB ? ACTIVE_TAB : UNACTIVE_TAB}>AUTHENTICATED</span
		>
	</li>
</ul>
