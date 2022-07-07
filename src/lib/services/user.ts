import { Client } from '@twilio/conversations'
export const signInWithDiscord = async () =>{
  const res = await fetch('/api/login-with-discord')
  
    if(!res.ok) {
      throw new Error('Could not get access token')
    }
  
    const { data } = await res.json()
    return data
}

export const createOrJoinConversation = async (
  { room, accessToken } : { room:string, accessToken:string}
  ) => { 
  const client = new Client(accessToken)
  return new Promise(resolve => { 
    client.on('stateChanged',async state =>{
      if(state === 'initialized'){
        let conversation
        try {
          conversation = await client.createConversation({uniqueName: room,friendlyName: room})
        } catch (error) {
          console.error(error)
          try {
            conversation = await client.getConversationByUniqueName(room)
            //conversation?.add('Zero')
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