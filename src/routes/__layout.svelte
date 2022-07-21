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
import NotificationMessage from '$lib/components/NotificationMessage.svelte';

	isLoadingScreen.set(true);
	onMount(async () => {
		supabase.auth.onAuthStateChange(async (event, sesh) => {
			if (event === 'SIGNED_IN' && $session === null) {
				const { data } = await supabase.from('users').select('*').eq('id', sesh.user.id);
				if (data.length === 0) {
					const res = await supabase.from('users').insert({
						id: sesh.user.id,
						username: sesh.user.user_metadata.name
					});
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

		if ( ($session === null || $discordUser?.id === '' || $user.id === '')&& ( $page.url.pathname === '/') || $page.url.pathname === '/home' || $page.url.pathname.startsWith('/home/server') && !$isInvited || $page.url.pathname.startsWith('/home/settings'))  {
			await goto('/');
			isLoadingScreen.set(false);
		}
		if( ($session !== null || $discordUser?.id === '' || $user.id !== '')&& !$page.url.pathname.startsWith('/invite')) {
			await goto('/home');
			isLoadingScreen.set(false);
		}
		if($page.url.pathname.startsWith('/invite')){
			isLoadingScreen.set(false);
		}
	});
</script>

<div class="flex flex-col h-screen ">
	{#if $isLoadingScreen}
	 <LoadingScreen bgColor="bg-gray-500"/>
	{:else}
		<main
			class="h-full w-full flex flex-col justify-center items-center bg-picture bg-cover bg-bottom bg-fixed"
		>
			<slot />
		</main>
	{/if}
	<ErrorMessage />
	<NotificationMessage />
</div>
