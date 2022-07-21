import { supabase } from '$lib/supabaseClient';
import cookie from 'cookie';
//These hooks get called with every request to the server.
//https://kit.svelte.dev/docs/hooks#handle
export const handle = async ({ event, resolve }) => {
	// Grab the cookie
	const cookies = await cookie.parse(event.request.headers.get('cookie') || '');
	const session = cookies.session ? JSON.parse(cookies.session) : null;
	const { data } = await supabase
		.from('servers')
		.select(
			'friendly_name, id,invite_code, channels!channels_server_id_fkey(friendly_name,id,description), channel_members!inner(server_id)'
		)
		.eq('channel_members.user_id', (session?.id || session?.user?.id) );
	// If the session is in the cookie, asign it to the SvelteKit's store in order to work with getStore()
	event.locals.user = session
		? {
				user:session,
				servers: data
		  }
		: null;

	// Asign the session in the cokies to the SvelteKit's store
	event.locals.session = session ? session.user : null;
	const response = await resolve(event);
	return response;
};

// https://kit.svelte.dev/docs/hooks#getsession
export const getSession = async (event) => {
	return event.locals.session;
};
