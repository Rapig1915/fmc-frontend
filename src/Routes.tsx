import React, { ReactElement } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './common';
import { Main as MainLayout } from './layouts';

import HomeView from './views';

const Routes = (): ReactElement => {
  return (
    <Switch>
      <RouteWithLayout
        component={HomeView}
        exact
        layout={MainLayout}
        path="/home"
      />
      <Redirect to="/home" />
    </Switch>
  );
};

export default Routes;
