export const getAccessToken = async ({ token,serviceSid }:{token: string,serviceSid:string}) => {
  const res = await fetch('/api/get-access-token', {
  headers:{
    jwt: token,
    serviceSid: serviceSid
  }
  })

  if(!res.ok) {
    throw new Error('Could not get access token')
  }

  const { accessToken } = await res.json()
  return accessToken
};

export const getServiceSid = async ({ friendlyName,uniqueName }:{friendlyName: string, uniqueName:string}) => {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/create-channel', {
  headers:{
    friendlyName: friendlyName,
    uniqueName: uniqueName,
  }
  })

  if(!res.ok) {
    throw new Error('Could not get serviceSid')
  }

  const { serviceSid } = await res.json()
  return serviceSid
};
