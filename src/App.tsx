import React from "react"
import { CssBaseline } from "@material-ui/core"
import { UserContextProvider } from "./UserContext"
import Routes from "Components/Routes"
function App() {
  return (
    <CssBaseline>
      <UserContextProvider>
      </UserContextProvider>
    </CssBaseline>
  )
}

export default App
