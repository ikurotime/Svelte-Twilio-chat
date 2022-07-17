// @ts-nocheck
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
			'friendly_name, SID, channels!channel_members(channel_friendly_name, channel_sid,description), channel_members!inner(server_sid)'
		)
		.eq('channel_members.user_id', session?.user.id);
	// If the session is in the cookie, asign it to the SvelteKit's store in order to work with getStore()
	event.locals.user = session
		? {
				access_token: session.access_token,
				id: session.user.id,
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
