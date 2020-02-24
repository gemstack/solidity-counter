import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import ErrorPage from '../containers/ErrorPage';
import PrivateRoute from './PrivateRoute';
import { ROUTES } from '../constant';

const routes = (
  <Switch>
    <PrivateRoute exact path={ROUTES.HOMEPAGE} component={Homepage} />
    <Route path={ROUTES.ERROR_PAGE} exact component={ErrorPage} />
    <Redirect from="/*" to={ROUTES.ERROR_PAGE} />
  </Switch>
);

export default routes;
