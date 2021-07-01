import React, { ReactElement } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import {
  Main as MainLayout,
  Minimal as MinimalLayout,
  Dashboard as DashboardLayout,
  Blank as BlankLayout,
} from 'src/layouts';
import { URL } from 'src/utils/consts';

import RouteWithLayout from './RouteWithLayout';
import { Quote, Home, Dashboard, Login } from '../views';

const Routes = (): ReactElement => {
  return (
    <Switch>
      <RouteWithLayout
        component={Home}
        exact
        layout={MainLayout}
        path={URL.HOME}
        otherDomainUrl="https://www.fixmycar.io/"
      />
      <RouteWithLayout
        component={Quote}
        exact
        layout={MinimalLayout}
        path={URL.QUOTE}
      />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={DashboardLayout}
        path={URL.DASHBOARD}
      />
      <RouteWithLayout
        component={Login}
        exact
        layout={BlankLayout}
        path={URL.LOGIN}
      />
      <Redirect to={URL.HOME} />
    </Switch>
  );
};

export default Routes;
