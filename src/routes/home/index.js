export async function get(event) {
  let userData
  const user = event.locals.user
  if (user) {
    userData = user
  }
  return {
    status: 200,
    body: {
      userData
    }
  }
}