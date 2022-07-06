export const getAccessToken = async ({ token }:{token: string}) => {
  const res = await fetch('/api/get-access-token', {
  headers:{
    jwt: token
  }
  })

  if(!res.ok) {
    throw new Error('Could not get access token')
  }

  const { accessToken } = await res.json()
  return accessToken
};
