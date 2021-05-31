import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';
import { QuoteStep } from 'src/types';
import SearchCar from './components/SearchCar';
import ServiceDesk from './components/ServiceDesk';
import QuoteContainer from './QuoteContainer';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Quote = (): ReactElement => {
  const [step, setStep] = useState(QuoteStep.QUOTE_SEARCH_CAR);

  const classes = useStyles();

  const handleStepChange = (newStep: QuoteStep, bForce?: boolean): void => {
    if (
      bForce ||
      parseInt(newStep as string, 10) <= parseInt(step as string, 10)
    )
      setStep(newStep);
  };

  const renderStepComponent = () => {
    return (
      (step === QuoteStep.QUOTE_SEARCH_CAR && (
        <SearchCar
          onConfirm={() => handleStepChange(QuoteStep.QUOTE_SERVICE_DESK, true)}
        />
      )) ||
      (step === QuoteStep.QUOTE_SERVICE_DESK && <ServiceDesk />) || (
        <Typography>Finish my booking here</Typography>
      )
    );
  };

  return (
    <Container className={classes.root}>
      <QuoteContainer currentStep={step} onStepChanged={handleStepChange}>
        {renderStepComponent()}
      </QuoteContainer>
    </Container>
  );
};

export default Quote;
