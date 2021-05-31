import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { arrQuoteSteps } from 'src/utils/data';
import { Image } from 'src/components/atoms';
import { QuoteStep } from 'src/types';

interface CheckStepProps {
  className?: string;
  currentStep: QuoteStep;
  onStepChanged: (ns: QuoteStep, bForce?: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 120,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(1),
  },
  itemContainer: {
    padding: 0,
    margin: 0,
  },

  step: {
    fontSize: 20,
    lineHeight: '25px',
    fontWeight: 600,
    color: '#BDC1DA',
    paddingBottom: theme.spacing(0.5),
    borderBottom: '3px solid #A2A1A8',
    textAlign: 'center',
    flexGrow: 1,
    margin: theme.spacing(1),
    minWidth: 50,
    cursor: 'pointer',

    '&.step-checked': {
      borderBottom: '3px solid #36D9A0',
      color: '#36D9A0',
      fontSize: 35,
    },

    '&.step-current': {
      borderBottom: '3px solid #36D9A0',
      color: '#36D9A0',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      maxHeight: 30,
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: '30%',
    },
  },
}));

const CheckStep = (props: CheckStepProps): ReactElement => {
  const { className, currentStep, onStepChanged } = props;

  const classes = useStyles();

  const currentStepIndex = parseInt(currentStep as string, 10);

  const renderStep = (step: QuoteStep, index: number) => {
    const bChecked: boolean = currentStepIndex >= index;
    const bCurrent: boolean = currentStepIndex === index;

    if (bChecked && bCurrent) {
      return (
        <Image
          className={clsx(classes.step, 'step-current')}
          key={step}
          src="/assets/badges/car.svg"
          lazy={false}
        />
      );
    }
    if (bChecked && !bCurrent) {
      return (
        <CheckCircle
          className={clsx(classes.step, 'step-checked')}
          key={step}
          onClick={() => onStepChanged(step)}
        />
      );
    }

    return (
      <Typography
        className={classes.step}
        key={step as string}
        onClick={() => onStepChanged(step)}
      >
        {index + 1}
      </Typography>
    );
  };

  return (
    <Box className={clsx('quote-check-step', classes.root, className)}>
      {arrQuoteSteps.map((step, index) => renderStep(step, index))}
    </Box>
  );
};

CheckStep.defaultProps = {
  className: undefined,
};

export default CheckStep;
