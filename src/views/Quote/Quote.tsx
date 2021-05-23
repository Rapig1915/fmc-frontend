import { Container, makeStyles } from '@material-ui/core';
import React, { ReactElement } from 'react';
import SearchCar from './components/SearchCar';
import QuoteContainer from './QuoteContainer';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Quote = (): ReactElement => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <QuoteContainer>
        <SearchCar />
      </QuoteContainer>
    </Container>
  );
};

export default Quote;
