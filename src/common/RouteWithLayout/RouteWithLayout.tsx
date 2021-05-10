import React, { ReactElement } from 'react';
import { Route } from 'react-router-dom';

interface RoleWithLayoutProps {
  component: any;
  layout: any;
  path?: string;
  exact?: boolean;
}

const RouteWithLayout = (props: RoleWithLayoutProps): ReactElement => {
  const { layout: Layout, component: Component, exact, ...rest } = props;

  return (
    <Route
      {...rest}
      exact
      render={(matchProps: any) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.defaultProps = {
  path: '',
  exact: false,
};

export default RouteWithLayout;
