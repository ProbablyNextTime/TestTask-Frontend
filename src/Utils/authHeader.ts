// get accessToken from local storage and wrap it as request header for auth
export default function authHeader() {
  const auth: string = localStorage.getItem("accessToken") || "" // Refresh token?

  if (auth) {
    return { Authorization: `bearer ${auth}` } // It's usually "Bearer"
  } else {
    return {}
  }
}
