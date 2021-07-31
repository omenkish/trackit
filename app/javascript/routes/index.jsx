import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Register from "../components/Register";
import Entries from "../components/Entries";

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/entries" exact component={Entries} />
    </Switch>
  </Router>
);
export default Routes;