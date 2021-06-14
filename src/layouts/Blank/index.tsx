import { Container, makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface BlankProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
}));

const Blank = (props: BlankProps): ReactElement => {
  const classes = useStyles();
  const { children } = props;

  return (
    <Container className={classes.root}>
      <main>{children}</main>
    </Container>
  );
};

Blank.defaultProps = {
  children: undefined,
};

export default Blank;
