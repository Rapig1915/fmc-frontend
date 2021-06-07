import React, { ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const useStyles = makeStyles((theme) => ({
  cardInput: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    background: theme.palette.common.white,
    borderRadius: 5,
    border: '2px solid #36D9A0',
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

  const stripe = useStripe();
  const elements = useElements();
  // const quote = useSelector(state => state.quote)
  const [errors, setErrors] = useState(null);
  const [requestInProgress, setRequestInProgress] = useState(false);
  // const history = useHistory();
  // const { isOnlyDiagnosis, isOnlyPrePurchaseInspection } = useContext(QuoteTypeContext);

  // const sendMetrics = () => {
  //   const totalVal = 0;
  //   // let sendTo;

  //   if (requestInProgress) {
  //     return false;
  //   }

  //   return totalVal;

  //   //   if (isOnlyDiagnosis) {
  //   //     totalVal = quote.appointment.diagnosis_fee || getDiagnosisFeeByZip(quote.appointment.address);
  //   //     sendTo = 'AW-792197156/iS79CKLb5tEBEKTw3_kC';
  //   //     gtag_report_conversion('AW-792197156/cCWvCIjBz_4BEKTw3_kC')
  //   //   } else if (isOnlyPrePurchaseInspection) {
  //   //     totalVal = quote.appointment.ppi_fee || getPPIFeeByZip(quote.appointment.address);
  //   //     sendTo = 'AW-792197156/iS79CKLb5tEBEKTw3_kC';
  //   //     gtag_report_conversion('AW-792197156/cCWvCIjBz_4BEKTw3_kC')
  //   //   } else {
  //   //     totalVal = quote.estimate.totalPrice;
  //   //     sendTo = 'AW-792197156/F97FCLfE69EBEKTw3_kC';
  //   //     gtag_report_conversion('AW-792197156/dUT8CJulovwBEKTw3_kC');
  //   //   }
  //   //   gtag_report_conversion(sendTo, quote.appointment.id);

  //   //   if (typeof fbq !== 'undefined') {
  //   //     fbq('track', 'Purchase', {
  //   //       value: parseFloat(totalVal),
  //   //       currency: 'USD'
  //   //     })
  //   //   }
  // };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (requestInProgress) {
      return false;
    }

    setRequestInProgress(true);
    setErrors(null);

    if (!stripe || !elements) {
      return false;
    }

    const cardElem = elements.getElement(CardElement);

    if (!cardElem) {
      return false;
    }

    // const { error, token } = await stripe.createToken(cardElem);

    return true;

    // if (token) {
    //   quoteService.confirmAppointment(quote.appointment.id, token.id).then((response) => {
    //     sendMetrics();
    //     bingTrack();
    //     mixPanel('Payment', quote.appointment.id);

    //     history.push(routes.CUSTOMER.APPOINTMENT.END.PATH);
    //   }).catch((response) => {
    //     if (response.json) {
    //       response.json().then(json => setErrors(json.errors.join('. ')));
    //     } else {
    //       setErrors('Sorry, there was an error when trying to book your appointment.');
    //     }
    //   }).finally(() => setRequestInProgress(false));
    // } else {
    //   setErrors(error.message);
    //   setRequestInProgress(false);
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full text-center">
      <CardElement options={cardStyle} className={classes.cardInput} />
      <p className="w-full mx-auto text-sm text-center text-fmc-red my-1 sm:my-2">
        {errors}
      </p>
    </form>
  );
};

export default CheckoutForm;
