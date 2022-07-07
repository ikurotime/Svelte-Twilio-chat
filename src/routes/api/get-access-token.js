// @ts-nocheck
import twilio from 'twilio';
import {v4 as uuidv4} from 'uuid';
const TWILIO_ACCOUNT_SID = import.meta.env.VITE_PUBLIC_TWILIO_ACCOUNT_SID;
const TWILIO_API_KEY = import.meta.env.VITE_PUBLIC_TWILIO_API_KEY;
const TWILIO_API_SECRET = import.meta.env.VITE_PUBLIC_TWILIO_API_SECRET;


export const get = async ({ request }) => {
	const jwt = request.headers.get('jwt');
	const SERVICE_SID = request.headers.get('serviceSid');

	if (jwt == null) {
		return { status: 401 };
	}

	//Temporal
	const identity = jwt.startsWith('anonymous') 
	? jwt +'_' + uuidv4() 
	: null;

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
