// @ts-nocheck
import twilio from 'twilio';
import { supabase } from '$lib/supabaseClient';
const TWILIO_ACCOUNT_SID = import.meta.env.VITE_PUBLIC_TWILIO_ACCOUNT_SID;
const TWILIO_API_KEY = import.meta.env.VITE_PUBLIC_TWILIO_API_KEY;
const TWILIO_API_SECRET = import.meta.env.VITE_PUBLIC_TWILIO_API_SECRET;

export const get = async ({ request }) => {
	// Get the jwt from the user and the SID from the created server
	const jwt = request.headers.get('jwt');
	const SERVICE_SID = request.headers.get('serverSid');

	if (jwt == null) {
		return { status: 401 };
	}
	let identity;
	/* We try to get the identity from the jwt in order to make a new jwt with Twilio
		 if the user is not anonymous we can get the identity directly from Supabase
	*/
	if (jwt.startsWith('anonymous')) {
		identity = jwt.split('_')[1];
	} else {
		const user = await supabase.auth.api.getUser(jwt);
		identity = user.data.user_metadata.full_name;
	}

	if (identity == null) return { status: 401 };

	const { AccessToken } = twilio.jwt;
	const { ChatGrant } = AccessToken;

	const accessToken = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, {
		identity
	});

	const conversationGrant = new ChatGrant({
		serviceSid: SERVICE_SID
	});

	accessToken.addGrant(conversationGrant);
	console.log(accessToken, identity);
	return {
		status: 200,
		body: {
			accessToken: accessToken.toJwt(),
			identity
		}
	};
};
