import { Client } from '@twilio/conversations';
import { supabase } from '../supabaseClient';

export const JoinConversation = async ({
	room,
	twilioAccessToken
}: {
	room: string;
	twilioAccessToken: string;
}) => {
	const client = new Client(twilioAccessToken);
	return new Promise((resolve) => {
		client.on('stateChanged', async (state) => {
			if (state === 'initialized') {
				let conversation;
				try {
					conversation = await client.getConversationBySid(room);
				} catch (error) {
					console.error(error);
				}
				resolve(conversation);
			}
		});
	});
};
