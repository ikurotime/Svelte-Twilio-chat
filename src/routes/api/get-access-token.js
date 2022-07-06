// @ts-nocheck
import twilio from 'twilio';

const TWILIO_ACCOUNT_SID = import.meta.env.VITE_PUBLIC_TWILIO_ACCOUNT_SID;
const TWILIO_API_KEY = import.meta.env.VITE_PUBLIC_TWILIO_API_KEY;
const TWILIO_API_SECRET = import.meta.env.VITE_PUBLIC_TWILIO_API_SECRET;
const SERVICE_SID = import.meta.env.VITE_PUBLIC_SERVICE_SID;

console.log({
	TWILIO_ACCOUNT_SID,
	TWILIO_API_KEY,
	TWILIO_API_SECRET,
	SERVICE_SID
});

export const get = async ({ request }) => {
	const jwt = request.headers.get('jwt');
	if (jwt == null) {
		return { status: 401 };
	}

	//Temporal
	const identity = jwt.startsWith('anonymous') ? jwt.split('_')[1] : jwt;

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

	return {
		status: 200,
		body: {
			accessToken: accessToken.toJwt()
		}
	};
};
