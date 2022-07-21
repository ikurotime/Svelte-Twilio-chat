<script>
	import StyledButton from '../StyledButton.svelte';
	import { user, userName, isRandomUser } from '$lib/stores/store';
	import Avatar from '../../../images/anonymous.png';
	import random from '../../../images/icons/random.svg';
	import discord from '../../../images/icons/discord.svg';
	import { goto } from '$app/navigation';
	import { signInWith, supabase } from '$lib/supabaseClient';
	import { v4 as uuidv4 } from 'uuid';

	async function handleAnonymousSubmit(e) {
		e.preventDefault();
		let uid = uuidv4();
		user.update((user) => {
			user.id = uid;
			user.avatar = `https://avatars.dicebear.com/api/open-peeps/${$userName}.svg`;
			user.username = $userName;
			user.email = 'a@a.com';
			user.access_token = `anonymous_${$userName}`;

			return user;
		});
		const userData = $user
		fetch('/api/cookie/', {
					method: 'POST',
					body: JSON.stringify(userData)
				})
		const { data, error } = await supabase.from('users').select('id').eq('username', $userName);
		if (data?.length === 0) {
			const { data, error } = await supabase.from('users').insert([
				{
					id: uid,
					username: $userName
				}
			]);
		}
		goto('/home');
	}

	function randomUserImage() {
		isRandomUser.set(true);
		userName.set('Anonymous_' + Math.random().toString(36).substr(2, 5));
		user.update((user) => {
			user.avatar = `https://avatars.dicebear.com/api/open-peeps/${$userName}.svg`;
			return user;
		});
	}
</script>

<form
	on:submit={handleAnonymousSubmit}
	class="p-5 bg-neutral-700 rounded h-96 grid place-content-center gap-3 justify-items-center text-white"
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
			class="p-3 rounded text-center border text-black"
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
		className="text-slate-800 bg-green-300 shadow-[0_5px_0_#4ade80] p-2 rounded-xl text-sm"
		icon={null}
	/>
	<p>- or -</p>
	<StyledButton
		text="LOGIN WITH DISCORD"
		onClick={() => signInWith('discord')}
		type="button"
		className="text-white bg-[#5865F2] shadow-[0_5px_0_#4853cf] p-2 rounded-xl text-sm"
		icon={discord}
	/>
</form>
