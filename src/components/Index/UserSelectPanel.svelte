<script>
	import StyledButton from '../StyledButton.svelte';
	import { user, userName, isJoinRoom, isRandomUser } from '../../store';
	import Avatar from '../../images/anonymous.png';
	import random from '../../images/icons/random.svg';
	import discord from '../../images/icons/discord.svg';
	/**
	 *
	 * @param {{ preventDefault: () => void; }} e
	 */
	function handleAnonymousSubmit(e) {
		e.preventDefault();
		//set random $userName

		user.update((user) => {
			if (!$isRandomUser)
				(user.avatar = `https://avatars.dicebear.com/api/open-peeps/${$userName}.svg`),
					(user.username = $userName),
					(user.email = 'a@a.com'),
					(user.token = `anonymous_${$userName}`);
			return user;
		});
	}

	function randomUserImage() {
		isRandomUser.set(true);
		userName.set('Anonymous_' + Math.random().toString(36).substr(2, 5));
		const random = Math.floor(Math.random() * 100);
		user.update((user) => {
			user.avatar = `https://avatars.dicebear.com/api/open-peeps/${random}.svg`;
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

<form
	on:submit={handleAnonymousSubmit}
	class="p-5 bg-white rounded h-96 grid place-content-center gap-3 justify-items-center"
>
	<img
		src={$user.avatar !== '' ? $user?.avatar : Avatar}
		class="w-20 h-20 rounded-full bg-white"
		alt={$user?.username}
		on:click={randomUserImage}
	/>

	<p>CHOOSE A CHARACTER AND A NICKNAME</p>
	<div class="flex gap-3">
		<input
			type="text"
			bind:value={$userName}
			placeholder={$userName}
			class="p-3 rounded text-center border"
		/>
		<StyledButton
			onClick={randomUserImage}
			type="button"
			text={''}
			className="text-white bg-[#DD2C1C] shadow-[0_5px_0_#b52316] p-2 h-10 rounded-xl text-sm"
			icon={random}
		/>
	</div>
	<StyledButton
		onClick={() => {}}
		type="submit"
		text="CONFIRM"
		className="text-white bg-[#4F5E5B] shadow-[0_5px_0_#3a4543] p-2 h-10 rounded-xl text-sm"
		icon={null}
	/>
	<!-- 	<div class="flex flex-row gap-3">
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
	</div> -->
	<p>-or-</p>
	<StyledButton
		text="LOGIN WITH DISCORD"
		onClick={handleCreatingRoom}
		type="button"
		className="text-white bg-[#5865F2] shadow-[0_5px_0_#4853cf] p-2 rounded-xl text-sm"
		icon={discord}
	/>
</form>
