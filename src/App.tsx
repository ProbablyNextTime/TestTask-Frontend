import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { CssBaseline } from "@material-ui/core"

import Login from "Components/Login";
import SignUp from "Components/SignUp";
import CreateSurvey from "Components/CreateSusrvey";
import SurveysBoard from "Components/SurveysBoard";
import Survey from "Components/Survey";
import ThankYou from "Components/ThankYou";


function App() {
  return (
    <CssBaseline>
      <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact path="/createSurvey" component={CreateSurvey} />
            <Route exact path="/surveys" component={SurveysBoard} />
            <Route
              exact
              path="/survey/:survey_id"
              render={({ match: { params } }) => <Survey surveyId={params.survey_id} />}
            />
            <Route exact path={"/thankYou"} component={ThankYou} />
          </Switch>
      </Router>
    </CssBaseline>
  );
}

export default App;
