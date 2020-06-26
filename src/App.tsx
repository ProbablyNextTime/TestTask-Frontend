import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from "Components/Login";
import SignUp from "Components/SignUp";
import CreateSurvey from "Components/CreateSusrvey";
import SurveysBoard from "Components/SurveysBoard";


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
          <Route exact path="/createSurvey" component={CreateSurvey} />
          <Route exact path="/surveys" component={SurveysBoard} />
        </Switch>
    </Router>
  );
}

export default App;
