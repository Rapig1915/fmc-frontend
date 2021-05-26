import React, { ReactElement } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

interface RoleWithLayoutProps extends RouteProps {
  layout: React.ComponentType;
  component: React.ComponentType<
    RouteComponentProps<{ [key: string]: string }>
  >;
}

const RouteWithLayout = (props: RoleWithLayoutProps): ReactElement => {
  const { layout: Layout, component: Component, exact, ...rest } = props;

  return (
    <Route
      {...rest}
      exact
      render={(matchProps: RouteComponentProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.defaultProps = {};

export default RouteWithLayout;
