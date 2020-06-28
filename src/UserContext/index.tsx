import React, { useReducer } from "react"
import { IUser } from "Interfaces/user"

export interface IUserContext {
  user: Partial<IUser>
  handleSettingUser: (user: IUserState) => void
}

export interface IUserState {
  user?: Partial<IUser>
}

const initialUser: Partial<IUser> = {
  username: localStorage.getItem("username") || "guest@guest.guest",
  role: localStorage.getItem("role") || "user",
}

const initialUserContext: IUserContext = {
  user: initialUser,
  handleSettingUser: (user: IUserState) => {
    throw new Error("Method not implemented.")
  },
}

const reducer = (state: IUserContext, action: any) => {
  switch (action.type) {
    case "handleSettingUser":
      return {
        ...state,
        user: action.payload.user,
      }
    default:
      return state
  }
}

const UserContext: React.Context<IUserContext> = React.createContext(initialUserContext)

const UserContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialUserContext)

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleSettingUser: (user: IUserState) => {
          dispatch({ type: "handleSettingUser", payload: user })
          localStorage.setItem("username", user.user?.username || "username")
          localStorage.setItem("role", user.user?.role || "user")
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContextProvider, UserContext }
