export const getTwilioAccessToken = async ({ token,serverSid }:{token: string,serverSid:string}) => {
  if(token == null) return null;
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/get-access-token', {
  headers:{
    jwt: token,
    serverSid: serverSid
  }
  })

  if(!res.ok) {
    throw new Error('Could not get access token')
  }
  const { accessToken,identity } = await res.json()

  return {accessToken,identity}
};

export const createServer = async ({ friendlyName,uniqueName,access_token,uid }:{friendlyName: string, uniqueName:string,access_token:string,uid:string}) => {
  
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/create-server', {
  headers:{
    friendlyName: friendlyName,
    uniqueName: uniqueName,
    access_token: access_token,
    uid: uid
  } 
  })

  if(!res.ok) {
    const {msg} = await res.json()
    throw new Error(msg)
  }

  const { serverSid, conversation } = await res.json()
  return {serverSid, conversation}
};

export const addParticipant = async ({identity,room,serverSid,uid } : { identity:string, room: string ,serverSid:string,uid: string}) => {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/add-participant', {
    headers:{
    identity,
    conversationSid: room,
    serverSid,
    uid
  } 
  })
  if(!res.ok) {
    throw new Error('Could not add participant')
  }

  return res
}
export const getConversations = async ({uid,serversid} : { uid:string,serversid:string}) => {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/get-user-conversations', {
    headers:{
    serversid,
    uid
  } 
  })
  if(!res.ok) {
    throw new Error('Could not get conversation')
  }
  const data = await res.json()
  return data[0]
}