import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import User from "./pages/User";

export default (
    <Router basename="/casigame">
      <Switch>
      <Route path="/users" exact component={User} />    
      <Route path="/" exact component={Home} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  </Router>


);