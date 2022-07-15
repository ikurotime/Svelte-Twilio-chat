<script>
	// @ts-nocheck

	import '../app.css';
	import { session, page } from '$app/stores';
	import { user } from '$lib/stores/store';
	import { signOut, supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	supabase.auth.onAuthStateChange((event, sesh) => {
		//console.log('onAuthStateChange: ', event, sesh);
		if (event === 'SIGNED_IN' && $session === null) {
			// Set cookie
			fetch('/api/cookie/', {
				method: 'POST',
				body: JSON.stringify(sesh)
			}).then(async (res) => {
				if (res.status === 200) {
					//loadPages()
					$session = sesh?.user;

					if (!$page.url.pathname.startsWith('/home')) {
						goto('/home', { replaceState: true });
					}
				} else {
					console.error('Failed to set cookie', res);
					signOut();
				}
			});
		} else if (event === 'SIGNED_OUT') {
			// Clear data from the pages and session store.
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
			});
		}
	});
</script>

<div class="flex flex-col h-screen ">
	<main
		class="h-full w-full flex flex-col justify-center items-center bg-picture bg-cover bg-bottom bg-fixed"
	>
		<slot />
	</main>
</div>
