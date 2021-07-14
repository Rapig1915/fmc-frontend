import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardElement } from '@stripe/react-stripe-js';
import useDeviseQuery from 'src/hooks/useDeviseQuery';

interface CheckOutFormProps {
  errors: string | undefined | null;
}

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
  error: {
    marginTop: theme.spacing(1),
    fontWeight: 500,
    fontSize: 16,
    color: '#a9a35c',
  },
}));

const cardStyle = (isXs: boolean) => ({
  style: {
    base: {
      padding: '0px',
      color: '#32325d',
      fontSmoothing: 'antialiased',
      fontSize: isXs ? '12px' : '16px',
      '::placeholder': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
});

const CheckoutForm = ({ errors }: CheckOutFormProps): ReactElement => {
  const classes = useStyles();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const { xsOnly } = useDeviseQuery();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={cardStyle(xsOnly)}
          className={classes.cardInput}
        />
        <p className={classes.error}>{errors}</p>
      </form>
    </>
  );
};

export default CheckoutForm;
