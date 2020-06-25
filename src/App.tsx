import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Login from "./Components/Login"

function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login" component={Login}>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
