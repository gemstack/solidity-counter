import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Homepage from '../containers/Homepage';
import ConnectPage from '../containers/ConnectPage';
import PrivateRoute from './PrivateRoute';
import { ROUTES } from '../constant';

const routes = (
  <Switch>
    <PrivateRoute exact path={ROUTES.HOMEPAGE} component={Homepage} />
    <Route path={ROUTES.CONNECT_PAGE} exact component={ConnectPage} />
    <Redirect from="/*" to={ROUTES.CONNECT_PAGE} />
  </Switch>
);

export default routes;
