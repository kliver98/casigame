import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";

export default (
    <Router basename="/casigame">
      <Switch> 
      <Route path="/" exact component={Home} />
      <Route path="*" component={PageNotFound} />
    </Switch>
  </Router>


);