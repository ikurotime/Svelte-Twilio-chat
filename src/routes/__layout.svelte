<script>
// @ts-nocheck

	import '../app.css';
	import { session } from '$app/stores';
	import { singOut, supabase} from "$lib/supabaseClient";
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	supabase.auth.onAuthStateChange((event,sesh) => {
		if (event === 'SIGNED_IN') {
			// Set cookie
			fetch('/api/cookie/',{
				method: 'POST',
				body: JSON.stringify(sesh)
			}).then(async(res) =>{
				if(res.status === 200){
					//loadPages()
					$session = sesh?.user;
					goto('/home');
				} else {
					console.error('Failed to set cookie', res)
					singOut();
				}
			}); 
		} else if (event === 'SIGNED_OUT') {
      // Clear data from the pages and session store.
      $session = null
      // Expire the cookie
      fetch('/api/cookie', {
        method: 'DELETE'
      })
      .then((res) => {
        if (res.status !== 204) {
          console.error('Failed to expire cookie', res)
        }
        goto('/')
      })
    }
  })
</script>

<div class="flex flex-col h-screen ">
	<main class="h-full w-full flex flex-col justify-center items-center bg-picture bg-cover bg-bottom bg-fixed">
	<slot />
</main>
</div>
