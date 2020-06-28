import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import ProtectedRoute from "ProtectedRoute"

import { CssBaseline } from "@material-ui/core"

import Login from "Components/Login"
import SignUp from "Components/SignUp"
import CreateSurvey from "Components/CreateSusrvey"
import SurveysBoard from "Components/SurveysBoard"
import Survey from "Components/Survey"
import ThankYou from "Components/ThankYou"
import { UserContextProvider } from "./UserContext"
import NotFound from "Components/NotFound";

function App() {
  return (
    <CssBaseline>
      // THIS SHOULD BE A SEPARATE COMPONENT
      <UserContextProvider>
        // ROUTES SHOULD BE A SEPARATE COMPONENT
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signUp" component={SignUp} />
            <ProtectedRoute isPrivate exact path="/createSurvey" component={CreateSurvey} />
            <ProtectedRoute isPrivate exact path="/surveys" component={SurveysBoard} />
            <ProtectedRoute
              isPrivate
              exact
              path="/survey/:survey_id"
              render={({ match: { params } }) => <Survey surveyId={params.survey_id} />}
            />
            <Route exact path={"/thankYou"} component={ThankYou} />4
            <Route path={"/"} component={NotFound} />
          </Switch>
        </Router>
        //  THIS SHOULD BE A SEPARATE COMPONENT
      </UserContextProvider>
    </CssBaseline>
  )
}

export default App
