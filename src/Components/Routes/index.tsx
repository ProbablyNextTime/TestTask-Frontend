import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "Components/Login"
import SignUp from "Components/SignUp"
import CreateSurvey from "Components/CreateSusrvey"
import SurveysBoard from "Components/SurveysBoard"
import Survey from "Components/Survey"
import ThankYou from "Components/ThankYou"
import NotFound from "Components/NotFound"
import React from "react"
import ProtectedRoute from "./ProtectedRoute"

function Routes() {
  return (
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
  )
}

export default Routes
