import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import ButtonForward from 'src/components/atoms/ButtonForward';
import ServiceBar from './ServiceBar';
import ServiceGallery from './ServiceGallery';
import ServiceSummary from './ServiceSummary';
import { ModalReviewQuote } from './ModalReviewQuote';

interface ServiceDeskProps {
  className?: string;
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
  buttonContinue: {
    maxWidth: 150,
    float: 'right',
  },
}));

const ServiceDesk = (props: ServiceDeskProps): ReactElement => {
  const { className } = props;

  const classes = useStyles();

  const [openModalReview, setOpenModalReview] = useState(false);

  const handleContinue = () => {
    setOpenModalReview(true);
  };

  return (
    <Box className={clsx('quote-choose-service', classes.root, className)}>
      <Typography className={classes.title}>How can we help?</Typography>
      <ServiceBar onGoToReview={handleContinue} />
      <ServiceGallery />
      <Box className={classes.summaryContainer}>
        <ServiceSummary className={classes.summaryService} />
        <ButtonForward
          title="Continue"
          rounded
          size="large"
          onClickHandler={handleContinue}
          className={classes.buttonContinue}
        />
      </Box>
      <ModalReviewQuote
        show={openModalReview}
        onClose={() => setOpenModalReview(false)}
      />
    </Box>
  );
};

ServiceDesk.defaultProps = {
  className: undefined,
};

export default ServiceDesk;
