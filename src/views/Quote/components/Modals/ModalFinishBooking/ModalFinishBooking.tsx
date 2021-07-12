import React, { ReactElement, useContext } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  DialogActions,
  DialogTitle,
  Grid,
  Hidden,
  IconButton,
  Typography,
  Link,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { ArrowBackIos, Close, CreditCard } from '@material-ui/icons';

import { ButtonForward, Image } from 'src/components/atoms';
import { ImageNode } from 'src/components/molecules';
import { cardTypes } from 'src/utils/data';
import { QuoteContext } from 'src/views/Quote/QuoteContext';
import { QuoteShowModal } from 'src/types';
import { IReduxState } from 'src/store/reducers';
import mixPanel from 'src/utils/mixpanel';
import { MIXPANEL_TRACK } from 'src/utils/consts';

import SvgSecurity from 'src/assets/badges/security.svg';
import SvgAdvantageMoney from 'src/assets/advantage/money.svg';
import SvgQuestion from 'src/assets/badges/question.svg';
import { brandOf } from 'src/assets/brands';
import SvgMechanic from 'src/assets/mechanic.svg';

import CheckoutForm from './CheckoutForm';
import MechanicInfo from './MechanicInfo';

interface ModalFinishBookingProps {
  show: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'hidden',
  },
  content: {
    minWidth: 600,
    [theme.breakpoints.down('sm')]: {
      minWidth: 500,
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 200,
      padding: theme.spacing(0),
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  title: {
    margin: 0,
    textAlign: 'center',
    padding: theme.spacing(4),
    '& .title-icon': {
      color: '#C5C9DE',
    },
  },
  titleText: {
    color: '#2A2D3C',
    fontSize: 23,
    lineHeight: '24px',
    fontWeight: 900,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  buttonGroupBack: {
    position: 'absolute',
    left: theme.spacing(2),
    top: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',

    [theme.breakpoints.down('xs')]: {
      '& .title-button': {
        display: 'none',
      },
    },
  },
  actionContainer: {
    width: '100%',
    textAlign: 'right',
  },

  titleDatetime: {
    fontWeight: 900,
    fontSize: 19,
    lineHeight: '22.8px',
    marginLeft: theme.spacing(1),
  },
  boxInformation: {
    width: '100%',
    background: '#EBF1FA',
    borderRadius: 6,
    padding: theme.spacing(4),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      background: 'transparent',
      borderRadius: 0,
      padding: 0,
    },
  },

  textPayment1: {
    fontWeight: 800,
    fontSize: 19,
    lineHeight: '29px',
    color: '#2A2D3C',
    marginBottom: theme.spacing(1),
  },
  textPayment2: {
    fontWeight: 500,
    fontSize: 18,
    lineHeight: '25px',
    color: '#667296',
    marginBottom: theme.spacing(3),
  },

  intro: {
    display: 'block',
  },

  containerMazda: {
    background: '#ebf1fa',
    padding: theme.spacing(2),
    borderRadius: '7px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgMazda: {
    maxHeight: 300,
    objectFit: 'contain',
    color: theme.palette.common.white,
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  titleMazda: {
    color: '#685364',
    fontWeight: 300,
    fontStyle: 'normal',
    fontSize: '17px',
    lineHeight: '22px',
  },

  containerWarranty: {
    marginTop: theme.spacing(2),
    background: '#594f91',
    borderRadius: '7px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    maxHeight: 100,
  },
  imgWarranty: {
    width: 30,
    height: 30,
    objectFit: 'contain',
    color: theme.palette.common.white,
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  titleWarranty: {
    color: theme.palette.common.white,
    fontWeight: 300,
    fontStyle: 'normal',
    fontSize: 17,
    lineHeight: '22px',
  },
  titlePhone: {
    color: theme.palette.common.white,
    fontWeight: 300,
    fontStyle: 'normal',
    fontSize: 17,
    lineHeight: '22px',
    textDecoration: 'none',
  },

  contentHolder: {
    minHeight: 650,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    padding: theme.spacing(4),
    alignContent: 'flex-start',
    position: 'relative',

    [theme.breakpoints.down('sm')]: {
      borderRadius: 9,
      minHeight: 500,
      padding: theme.spacing(2),
    },
  },
}));

const ModalFinishBooking = (props: ModalFinishBookingProps): ReactElement => {
  const { show, onClose } = props;
  const classes = useStyles();

  const appointment = useSelector(
    (state: IReduxState) => state.quote.appointment
  );

  const appointmentStatus = useSelector(
    (state: IReduxState) => state.quote.appointment?.attributes.status
  );

  const {
    handleShowModal,
    handleConfirmAppointment,
    requestInProgress,
  } = useContext(QuoteContext);

  const stripe = useStripe();
  const elements = useElements();
  const [errors, setErrors] = React.useState<string | undefined | null>(null);

  const handleCheckOut = async () => {
    setErrors(null);

    if (!stripe || !elements) {
      return false;
    }

    const cardElem = elements.getElement(CardElement);

    if (!cardElem) {
      return false;
    }

    // const { error, token } = await stripe.createToken(cardElem);
    const { token } = await stripe.createToken(cardElem);

    if (token) {
      await handleConfirmAppointment({ token: token.id });
    } else {
      setErrors('Quote confirmation failed');
    }

    mixPanel(MIXPANEL_TRACK.CARD_INFO);

    return true;
  };

  const handleStepBack = () => {
    handleShowModal(QuoteShowModal.SCHEDULE_SERVICE);
  };

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
      className={classes.content}
    >
      <DialogTitle className={classes.title}>
        <Box className={classes.buttonGroupBack}>
          <ArrowBackIos className="title-icon" onClick={handleStepBack} />
        </Box>
        <Typography className={classes.titleText}>
          Finish your booking
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Grid container>
          <Hidden smDown>
            <Grid container item md={4} className={classes.intro}>
              <ImageNode
                key="mazda"
                title={
                  <>
                    <b>
                      {appointment?.attributes.car.make}{' '}
                      {appointment?.attributes.car.year}
                    </b>
                  </>
                }
                imgUrl={brandOf(appointment?.attributes.car.make)}
                titleProps={{ className: classes.titleMazda }}
                imgProps={{ className: classes.imgMazda }}
                className={classes.containerMazda}
              />
              <ImageNode
                key="warranty"
                title={
                  <>
                    <b>Service warranty:</b>
                    <br />
                    24 months / 24,000 mi warranty on each job.
                  </>
                }
                imgUrl={SvgSecurity}
                titleProps={{ className: classes.titleWarranty }}
                imgProps={{ className: classes.imgWarranty }}
                className={classes.containerWarranty}
              />
              <ImageNode
                key="price"
                title={
                  <>
                    <b>Fixed price:</b>
                    <br />
                    All prices are fixed
                  </>
                }
                imgUrl={SvgAdvantageMoney}
                titleProps={{ className: classes.titleWarranty }}
                imgProps={{ className: classes.imgWarranty }}
                className={classes.containerWarranty}
              />
              <ImageNode
                key="call"
                title={
                  <>
                    <b>Questions?</b>
                    <br />
                    <Link
                      key="tel-team-fixmycar"
                      className={classes.titlePhone}
                      href="tel:(214) 799-1773"
                    >
                      Call us (214) 799-1773
                    </Link>
                  </>
                }
                imgUrl={SvgQuestion}
                titleProps={{ className: classes.titleWarranty }}
                imgProps={{ className: classes.imgWarranty }}
                className={classes.containerWarranty}
              />
            </Grid>
          </Hidden>
          <Grid
            container
            item
            md={8}
            sm={12}
            xs={12}
            className={classes.contentHolder}
          >
            {appointment?.attributes.mechanic &&
              appointment?.attributes.mechanic.name && (
                <Box
                  key="mechanic-title"
                  flexDirection="row"
                  display="flex"
                  alignItems="center"
                >
                  <Image src={SvgMechanic} />
                  <Typography className={classes.titleDatetime} noWrap>
                    Your mechanic
                  </Typography>
                </Box>
              )}
            <MechanicInfo
              key="mechanic"
              className={clsx(classes.boxInformation)}
            />
            <Box key="payment-title" flexDirection="row" display="flex">
              <CreditCard color="primary" />
              <Typography className={classes.titleDatetime} noWrap>
                Payment details
              </Typography>
            </Box>
            <Box key="payment" className={classes.boxInformation}>
              <Typography
                key="title-payment-1"
                className={classes.textPayment1}
              >
                You will not be charged until your service is completed.
              </Typography>
              <Box key="action-payment">
                <CheckoutForm errors={errors} />
                <Box
                  key="image-payments"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  marginTop={2}
                >
                  {cardTypes.map((ct) => (
                    <Image key={ct} src={`/assets/payment/${ct}.svg`} />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <DialogActions className={classes.actionContainer}>
          {appointmentStatus !== 'complete' && (
            <ButtonForward
              key="finish-booking"
              title="Finish booking"
              size="large"
              rounded
              onClickHandler={handleCheckOut}
              disabled={requestInProgress}
              processing={requestInProgress}
            />
          )}
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

ModalFinishBooking.defaultProps = {};

export default ModalFinishBooking;
