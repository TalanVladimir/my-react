import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  LoginPage,
  BuyPage,
  FinanciesPage,
  AccountPage,
  NotFoundPage,
} from "../../pages";

import ErrorBoundry from "../ErrorBoundry";

import "./styles.scss";

const App = () => {
  return (
    <ErrorBoundry>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/logout' component={LoginPage} />
          <Route path='/buy' component={BuyPage} />
          <Route path='/financies' component={FinanciesPage} />
          <Route path='/account' component={AccountPage} />
          <Route path='*' component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ErrorBoundry>
  );
};

export default App;
