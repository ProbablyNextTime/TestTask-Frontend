// get accessToken from local storage and wrap it as request header for auth
export default function authHeader() {
  const auth: string = localStorage.getItem("accessToken") || "";

  if(auth) {
    return { "Authorization": `bearer ${auth}`}
  } else {
    return {}
  }
}