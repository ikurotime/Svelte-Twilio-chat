import { Client } from '@twilio/conversations'
import { supabase } from '../supabaseClient'

export const JoinConversation = async (
  { room, twilioAccessToken} : { room:string, twilioAccessToken:string}
  ) => { 
  const client = new Client(twilioAccessToken)
  return new Promise(resolve => { 
    client.on('stateChanged',async state =>{
      if(state === 'initialized'){
        let conversation
        try {
          conversation = await client.getConversationBySid(room)
        } catch (error) {
          console.error(error)
        }
        resolve(conversation)
      }
    })
  })
}

export const createDefaultChannels = async (
  { twilioAccessToken,serverSid,id } : { twilioAccessToken:string, serverSid:string ,id:string}
  ) => { 
  const client = new Client(twilioAccessToken)
  return new Promise(resolve => { 
    client.on('stateChanged',async state =>{
      if(state === 'initialized'){
        let conversation
        try {
          conversation = await client.createConversation({ uniqueName: 'general',friendlyName: 'general' })
          if(conversation) {
            // Insert the conversation into the database
            await supabase.from('channels').insert({
              id: serverSid, friendly_name: 'general', channel_id: conversation.sid
            })
          }
        } catch (error) {
          console.error(error)
        } 

        resolve(conversation)
      }
    })
  })
}
