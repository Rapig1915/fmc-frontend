import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Topbar } from './components';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    height: '100%',
  },
}));

interface MinimalProps {
  children?: React.ReactNode;
  className?: string;
}

const Minimal = (props: MinimalProps): ReactElement => {
  const { children, className } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Topbar />
      <Divider />
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Minimal.defaultProps = {
  children: undefined,
  className: undefined,
};

export default Minimal;
