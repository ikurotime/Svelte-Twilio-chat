<script>
	// @ts-nocheck

	import '../app.css';
	import { session, page } from '$app/stores';
	import { discordUser, isInvited, isLoadingScreen, user } from '$lib/stores/store';
	import { signOut, supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
import LoadingScreen from '$lib/components/LoadingScreen.svelte';

	isLoadingScreen.set(true);
	onMount(async () => {
		let userData = localStorage.getItem('user');
		console.log(userData)
		if (userData) {
			user.set(JSON.parse(userData));
			console.log($discordUser)
		}
		console.log($user)
		if (($session?.aud === 'authenticated' || $user.id !== '' ) && ( $page.url.pathname === '/') || $page.url.pathname === '/home' || $page.url.pathname.startsWith('/home/server') && !$isInvited || $page.url.pathname.startsWith('/home/settings'))  {
			await goto('/home');
			isLoadingScreen.set(false);
		} else if((!$session?.aud && $user.id === '' ) && !$page.url.pathname.startsWith('/invite')) {
			await goto('/');
			isLoadingScreen.set(false);
		}else if($page.url.pathname.startsWith('/invite')){
			isLoadingScreen.set(false);
		}
		supabase.auth.onAuthStateChange(async (event, sesh) => {
			if (event === 'SIGNED_IN' && $session === null) {
				//console.log('onAuthStateChange: ', event, sesh);
				const { data } = await supabase.from('users').select('*').eq('id', sesh.user.id);
				//console.log(data);
				//console.log(data.length);
				if (data.length === 0) {
					const res = await supabase.from('users').insert({
						id: sesh.user.id,
						username: sesh.user.user_metadata.name
					});
					//console.log(res);
				}
				fetch('/api/cookie/', {
					method: 'POST',
					body: JSON.stringify(sesh)
				}).then(async (res) => {
					if (res.status === 200) {
						//loadPages()
						$session = sesh?.user;

						if (!$page.url.pathname.startsWith('/home')) {
							goto('/home', { replaceState: true });
							isLoadingScreen.set(false);
						}
					} else {
						console.error('Failed to set cookie', res);
						signOut();
					}
				});
			} else if (event === 'SIGNED_OUT') {
				// Clear data from the pages and session store.
				discordUser.set([]);
				$session = null;
				localStorage.removeItem('user');
				user.set({
					id: '',
					avatar: '',
					username: '',
					email: '',
					token: ''
				});
				// Expire the cookie
				fetch('/api/cookie', {
					method: 'DELETE'
				}).then((res) => {
					if (res.status !== 204) {
						console.error('Failed to expire cookie', res);
					}
					goto('/');
					isLoadingScreen.set(false);
				});
			}
		});
	});
</script>

<div class="flex flex-col h-screen ">
	{#if $isLoadingScreen}
		<LoadingScreen/>
	{:else}
		<main
			class="h-full w-full flex flex-col justify-center items-center bg-picture bg-cover bg-bottom bg-fixed"
		>
			<slot />
		</main>
	{/if}
	<ErrorMessage />
</div>
