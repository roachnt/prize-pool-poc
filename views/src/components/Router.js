import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import App from "./App";
import RegisterForm from "./RegisterForm";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

const AppRouter = props => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/register" component={RegisterForm} />
    </Switch>
  </Router>
);

export default AppRouter;
