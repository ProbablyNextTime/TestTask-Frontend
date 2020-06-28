import axios, { AxiosResponse } from "axios"
import { IUser } from "Interfaces/user"
// Why not just go with names "login" and "signUp" >
// Also what about refresh token?
export const loginUserAPI = async (username: string, password: string): Promise<IUser> => {
  const response: AxiosResponse = await axios.post("/login", {
    user: {
      username: username,
      password: password,
    },
  })
  localStorage.setItem("accessToken", response.data.accessToken)
  return response.data.user
}


export const signUpUserAPI = async (username: string, password: string): Promise<void> =>
  await axios.post("/signUp", {
    user: {
      username: username,
      password: password,
    },
  })
