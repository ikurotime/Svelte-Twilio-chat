import { activeConversation } from './../store';
import { Client } from '@twilio/conversations'

export const createOrJoinConversation = async (
  { room, accessToken } : { room:string, accessToken:string}
  ) => { 
  const client = new Client(accessToken )
  return new Promise(resolve => { 
    client.on('stateChanged',async state =>{
      if(state === 'initialized'){
        let conversation
        try {
          conversation = await client.createConversation({uniqueName: room})
        } catch (error) {
          console.error(error)
          try {
            conversation = await client.getConversationByUniqueName(room)
          } catch (error) {
            console.error(error)
          }
        }
       /*  conversation?.add('ma')
        conversation?.add('mb') */

        conversation?.join()

        resolve(conversation)
      }
    })
  })
}