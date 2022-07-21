
export const getTwilioAccessToken = async ({ token,serverSid }:{token: string,serverSid:string}) => {
  if(token == null) return null;
  var headers = new Headers();

  headers.append('Accept', 'application/json'); // This one is enough for GET requests
  headers.append('Content-Type', 'application/json'); // This one sends body
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/get-access-token', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
    jwt: token,
    serverSid: serverSid
  }),
  })

  if(!res.ok) {
    throw new Error('Could not get access token')
  }
  const { accessToken,identity } = await res.json()

  return {accessToken,identity}
};

export const createServer = async ({ friendlyName,uniqueName,access_token,uid }:{friendlyName: string, uniqueName:string,access_token:string,uid:string}) => {
  var headers = new Headers();

  headers.append('Accept', 'application/json'); // This one is enough for GET requests
  headers.append('Content-Type', 'application/json'); // This one sends body
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/create-server', {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({friendlyName,uniqueName,access_token,uid})
  })

  if(!res.ok) {
    return {error: 'Server already exists'}
  }

  const { serverSid, conversation } = await res.json()
  return {serverSid, conversation}
};
export const createChannel = async ({ friendlyName,access_token,uid }:{friendlyName: string,access_token:string,uid:string}) => {
  var headers = new Headers();

  headers.append('Accept', 'application/json'); // This one is enough for GET requests
  headers.append('Content-Type', 'application/json'); // This one sends body
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/create-server', {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({friendlyName,access_token,uid})
  })

  if(!res.ok) {
    return {error: 'Server already exists'}
  }

  const { serverSid, conversation } = await res.json()
  return {serverSid, conversation}
};
export const addParticipant = async ({identity,room,serverSid,uid } : { identity:string, room: string ,serverSid:string,uid: string}) => {
  var headers = new Headers();

  headers.append('Accept', 'application/json'); // This one is enough for GET requests
  headers.append('Content-Type', 'application/json'); // This one sends body
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/add-participant', {
    headers: headers,
    method: 'POST',
  body: JSON.stringify({
    identity,
    conversationSid: room,
    serverSid,
    uid
  })
  })
  if(!res.ok) {
    throw new Error('Could not add participant')
  }

  return res
}

export const deleteServer = async ({serverSid } : { serverSid:string}) => {
  var headers = new Headers();
  headers.append('Accept', 'application/json'); // This one is enough for GET requests
  headers.append('Content-Type', 'application/json'); // This one sends body
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/delete-server', {
    headers: headers,
    method: 'POST',
  body: JSON.stringify({
    serverSid
  })
  })
  if(!res.ok) {
    throw new Error('Could not delete server')
  }

  return res
}
