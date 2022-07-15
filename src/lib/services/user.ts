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
    //console.log('createDefaultChannels')
  const client = new Client(twilioAccessToken)
  //console.log(twilioAccessToken)
  //console.log(client)
  return new Promise(resolve => { 
    client.on('stateChanged',async state =>{
      if(state === 'initialized'){
        let conversation
        try {
          conversation = await client.createConversation({ uniqueName: 'general',friendlyName: 'general' })
          if(conversation) {
            // Insert the conversation into the database
            await supabase.from('channels').insert({
              server_sid: serverSid, channel_friendly_name: 'general', channel_sid: conversation.sid,created_by:id
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
