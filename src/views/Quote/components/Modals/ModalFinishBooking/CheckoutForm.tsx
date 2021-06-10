import React, { ReactElement, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Check } from '@material-ui/icons';
import { QuoteContext } from 'src/views/Quote/QuoteContext';

const useStyles = makeStyles((theme) => ({
  cardInput: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    background: theme.palette.common.white,
    borderRadius: 5,
    border: '2px solid #36D9A0',
  },

  buttonPayFull: {
    background: '#2CC791',
    borderRadius: 5,
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    cursor: 'pointer',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
    },

    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(3),

      [theme.breakpoints.down('sm')]: {
        marginRight: theme.spacing(1),
      },
    },
    '& .titleAction': {
      fontWeight: 800,
      fontSize: 16,
      color: theme.palette.common.white,
    },
    '& .descAction': {
      fontWeight: 500,
      fontSize: 16,
      color: '#247056',

      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        width: 'max-content',
      },
    },

    '&:hover': {
      background: '#3CD791',
    },
  },
  buttonPayInstallment: {
    display: 'none',
    background: '#BDC1DA',
    borderRadius: 5,
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    cursor: 'pointer',

    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
    },

    '& .titleAction': {
      fontWeight: 800,
      fontSize: 16,
      color: '#79739C',
    },
    '& .descAction': {
      fontWeight: 500,
      fontSize: 16,
      color: '#79739c',

      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        width: 'max-content',
      },
    },
  },
}));

const cardStyle = {
  style: {
    base: {
      color: '#32325d',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const CheckoutForm = (): ReactElement => {
  const classes = useStyles();

  const { handleConfirmAppointment } = useContext(QuoteContext);

  const stripe = useStripe();
  const elements = useElements();
  const [errors, setErrors] = useState<string | undefined | null>(null);
  const [requestInProgress, setRequestInProgress] = useState(false);

  const handlePayment = async () => {
    setRequestInProgress(true);
    setErrors(null);

    if (!stripe || !elements) {
      setRequestInProgress(false);
      return false;
    }

    const cardElem = elements.getElement(CardElement);

    if (!cardElem) {
      setRequestInProgress(false);
      return false;
    }

    // const { error, token } = await stripe.createToken(cardElem);
    const { token } = await stripe.createToken(cardElem);

    if (token) handleConfirmAppointment({ token: token.id });

    setRequestInProgress(false);

    return true;
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    handlePayment();
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Box
            key="action-pay-full"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            className={classes.buttonPayFull}
            onClick={() => handlePayment()}
          >
            {requestInProgress ? (
              <CircularProgress
                color="secondary"
                size={30}
                style={{ marginRight: 29 }}
              />
            ) : (
              <Check color="action" fontSize="large" />
            )}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Typography key="title" className="titleAction">
                Book Now
              </Typography>
              <Typography key="description" className="descAction">
                Pay in Full later
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Box
            key="action-pay-installment"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            className={classes.buttonPayInstallment}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="center"
            >
              <Typography key="title" className="titleAction">
                Book Now
              </Typography>
              <Typography key="description" className="descAction">
                Pay in installments later
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit} className="w-full text-center">
        <CardElement options={cardStyle} className={classes.cardInput} />
        <p className="w-full mx-auto text-sm text-center text-fmc-red my-1 sm:my-2">
          {errors}
        </p>
      </form>
    </>
  );
};

export default CheckoutForm;
