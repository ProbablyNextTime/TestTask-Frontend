import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from "./Components/Login"
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
        </Switch>
    </Router>
  );
}

export default App;
