import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import {
  RegisterPage,
  LoginPage,
  BuyPage,
  FinanciesPage,
  ProfilePage,
} from "../../pages";

import ErrorBoundry from "../ErrorBoundry";

import "./styles.scss";

const App = () => {
  return (
    <ErrorBoundry>
      <BrowserRouter>
        <Switch>
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/logout'>
            <Redirect to='/login' />
          </Route>
          <Route exact path='/new-react/' component={LoginPage} />

          <Route path='/buy' component={BuyPage} />
          <Route path='/financies' component={FinanciesPage} />
          <Route path='/account' component={ProfilePage} />
          <Route path='*'>
            <Redirect to='/buy' />
          </Route>
        </Switch>
      </BrowserRouter>
    </ErrorBoundry>
  );
};

export default App;
