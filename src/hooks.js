// @ts-nocheck
import cookie from 'cookie'
  //These hooks get called with every request to the server.
  //https://kit.svelte.dev/docs/hooks#handle
export const handle = async ({event,resolve}) => {
  // Grab the cookie
  const cookies = await cookie.parse(event.request.headers.get('cookie') || '')
  const session = cookies.session ? JSON.parse(cookies.session) : null

  // If the session is in the cookie, asign it to the SvelteKit's store in order to work with getStore()
  event.locals.user = session 
  ? {
    access_token: session.access_token,
    id: session.user.id
  }
  : null

  // Asign the session in the cokies to the SvelteKit's store
  event.locals.session = session ? session.user : null
  const response = await resolve(event)
  return response
}

// https://kit.svelte.dev/docs/hooks#getsession
export const getSession = async (event) => {
  return event.locals.session
}
