import React, { ReactElement } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { Main as MainLayout, Minimal as MinimalLayout } from 'src/layouts';
import { URL } from 'src/utils/consts';

import RouteWithLayout from './RouteWithLayout';
import { Quote, Home } from '../views';

const Routes = (): ReactElement => {
  return (
    <Switch>
      <RouteWithLayout
        component={Home}
        exact
        layout={MainLayout}
        path={URL.HOME}
      />
      <RouteWithLayout
        component={Quote}
        exact
        layout={MinimalLayout}
        path={URL.QUOTE}
      />
      <Redirect to={URL.HOME} />
    </Switch>
  );
};

export default Routes;
