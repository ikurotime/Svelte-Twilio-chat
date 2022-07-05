<script>
	import { user, userName, isJoinRoom, roomCode } from '../../store';
	import Avatar from '../../images/anonymous.png';
	import IndexTabs from '../Index/IndexTabs.svelte';
	import UserSelectContent from '../Index/UserSelectContent.svelte';
	import StyledButton from '../StyledButton.svelte';
	/**
	 *
	 * @param {{ preventDefault: () => void; }} e
	 */
	function handleAnonymousSubmit(e) {
		e.preventDefault();
		user.set({
			avatar: `https://avatars.dicebear.com/api/jdenticon/${$userName}.svg`,
			username: $userName,
			email: 'a@a.com',
			token: `anonymous_${$userName}`
		});
	}

	function randomUserName() {
		const random = Math.floor(Math.random() * 100);
		return `anonymous_${random}`;
	}
	function randomUserImage() {
		const random = Math.floor(Math.random() * 100);

		user.update((user) => {
			user.avatar = `https://avatars.dicebear.com/api/jdenticon/${random}.svg`;
			return user;
		});
	}

	/**
	 * @param {{ preventDefault: () => void; }} e
	 */
	function handleLoginSubmit(e) {
		e.preventDefault();
	}
	/**
	 * @param {{ preventDefault: () => void; }} e
	 */
	function handleJoiningRoom(e) {
		e.preventDefault();
		isJoinRoom.set(true);
	}
	/**
	 * @param {{ preventDefault: () => void; }} e
	 */
	function handleCreatingRoom(e) {
		e.preventDefault();
		isJoinRoom.set(false);
	}
</script>

<div class="max-w-lg w-full">
	<IndexTabs />
	<form
		on:submit={handleAnonymousSubmit}
		class="p-3 bg-gray-100 rounded h-96 grid place-content-center gap-3 justify-items-center"
	>
		{#if !$isJoinRoom}
			<img
				src={$user.avatar !== '' ? $user?.avatar : Avatar}
				class="w-20 h-20 rounded-full"
				alt={$user?.username}
				on:click={randomUserImage}
			/>
			<UserSelectContent />
			<div class="flex flex-row gap-3">
				<StyledButton
					text="JOIN ROOM"
					onClick={handleJoiningRoom}
					type="button"
					className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
				/>
				<StyledButton
					text="CREATE ROOM"
					onClick={handleCreatingRoom}
					type="button"
					className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
				/>
			</div>
		{:else}
			<p>ENTER YOUR ROOM CODE</p>
			<div class="flex gap-3">
				<input type="text" bind:value={$roomCode} class="p-3 rounded text-center" />
				<StyledButton
					text="JOIN ROOM"
					onClick={() => {}}
					type="button"
					className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
				/>
			</div>
			<StyledButton
				text="GO BACK"
				onClick={() => {
					isJoinRoom.set(false);
				}}
				type="button"
				className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
			/>
		{/if}
	</form>
</div>
