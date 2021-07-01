import React, { ReactElement } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

interface RoleWithLayoutProps extends RouteProps {
  otherDomainUrl?: string;
  layout: React.ComponentType;
  component: React.ComponentType<
    RouteComponentProps<{ [key: string]: string }>
  >;
}

const RouteWithLayout = (props: RoleWithLayoutProps): ReactElement => {
  const {
    layout: Layout,
    component: Component,
    exact,
    otherDomainUrl,
    ...rest
  } = props;

  const handleRender = (matchProps: RouteComponentProps) => {
    if (otherDomainUrl) {
      window.location.href = otherDomainUrl;
      return null;
    }

    return (
      <Layout>
        <Component {...matchProps} />
      </Layout>
    );
  };

  return <Route {...rest} exact render={handleRender} />;
};

RouteWithLayout.defaultProps = {
  otherDomainUrl: undefined,
};

export default RouteWithLayout;
