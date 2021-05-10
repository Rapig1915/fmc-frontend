import React, { ReactElement } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './common';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Home as HomeView,
  SignupSimple as SignupSimpleView,
  NotFound as NotFoundView,
} from './views';

const Routes = (): ReactElement => {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <RouteWithLayout
        component={HomeView}
        exact
        layout={MainLayout}
        path="/home"
      />
      <RouteWithLayout
        component={SignupSimpleView}
        exact
        layout={MainLayout}
        path="/signup-simple"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/home" />
    </Switch>
  );
};

export default Routes;
