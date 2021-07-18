import React, { ReactElement, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { ButtonForward } from 'src/components/atoms';

import ServiceBar from './ServiceBar';
import ServiceGallery from './ServiceGallery';
import ServiceSummary from './ServiceSummary';
import { QuoteContext } from '../../QuoteContext';

interface ServiceDeskProps {
  className?: string;
  onContinue?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  title: {
    fontSize: 23,
    lineHeight: '28px',
    fontWeight: 800,
    marginBottom: theme.spacing(3),
    width: '100%',
  },
  summaryContainer: {
    float: 'right',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  summaryService: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  actionContainer: {
    width: '100%',
    minHeight: 70,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',

    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },

    '& .button-mobile-info': {
      width: 45,
      height: 45,
    },
  },
  buttonContinue: {
    maxWidth: 150,
    float: 'right',

    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      top: 'calc(100% - 60px)',
      right: theme.spacing(2),
    },
  },
}));

const ServiceDesk = (props: ServiceDeskProps): ReactElement => {
  const { className, onContinue } = props;

  const classes = useStyles();

  const handleContinue = () => {
    if (onContinue) onContinue();
  };

  const { services, staticServices } = useContext(QuoteContext);
  return (
    <Box className={clsx('quote-choose-service', classes.root, className)}>
      <Typography className={classes.title}>How can we help?</Typography>
      <ServiceBar onContinue={handleContinue} />
      <ServiceGallery />
      <Box className={classes.summaryContainer}>
        <ServiceSummary className={classes.summaryService} />
      </Box>
      <Box className={classes.actionContainer}>
        <ButtonForward
          title="Continue"
          rounded
          size="large"
          onClickHandler={handleContinue}
          className={classes.buttonContinue}
          disabled={services.length <= 0 && staticServices.length <= 0}
        />
      </Box>
    </Box>
  );
};

ServiceDesk.defaultProps = {
  className: undefined,
  onContinue: undefined,
};

export default ServiceDesk;
