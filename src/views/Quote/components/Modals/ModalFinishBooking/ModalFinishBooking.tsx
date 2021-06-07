import React, { ReactElement, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { ArrowBackIos, Check, Close, CreditCard } from '@material-ui/icons';

import { ButtonForward, Image } from 'src/components/atoms';
import { cardTypes } from 'src/utils/data';
import { QuoteContext } from 'src/views/Quote/QuoteContext';
import { QuoteShowModal } from 'src/types';
import CheckoutForm from './CheckoutForm';
import MechanicInfo from './MechanicInfo';

interface ModalFinishBookingProps {
  show: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {},
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#79739C',
      outline: 0,
      borderRadius: 3.5,
    },
  },
  root: {
    minWidth: 600,
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
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

  buttonPayFull: {
    background: '#2CC791',
    borderRadius: 5,
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),

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
  },
  buttonPayInstallment: {
    display: 'none',
    background: '#BDC1DA',
    borderRadius: 5,
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),

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

const ModalFinishBooking = (props: ModalFinishBookingProps): ReactElement => {
  const { show, onClose } = props;
  const classes = useStyles();

  const { handleShowModal } = useContext(QuoteContext);
  const handleFinishBooking = () => {
    handleShowModal(QuoteShowModal.CONGRATS);
  };

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
    >
      <DialogTitle className={classes.title}>
        <Box className={classes.buttonGroupBack}>
          <ArrowBackIos className="title-icon" />
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
      <DialogContent className={classes.root}>
        <Box
          key="mechanic-title"
          flexDirection="row"
          display="flex"
          alignItems="center"
        >
          <Image src="/assets/mechanic.svg" />
          <Typography className={classes.titleDatetime} noWrap>
            Your mechanic
          </Typography>
        </Box>
        <MechanicInfo key="mechanic" className={clsx(classes.boxInformation)} />
        <Box key="payment-title" flexDirection="row" display="flex">
          <CreditCard color="primary" />
          <Typography className={classes.titleDatetime} noWrap>
            Payment details
          </Typography>
        </Box>
        <Box key="payment" className={classes.boxInformation}>
          <Typography key="title-payment-1" className={classes.textPayment1}>
            You will not be charged now
          </Typography>
          <Typography key="title-payment-2" className={classes.textPayment2}>
            Not until service is completed.
          </Typography>
          <Box key="action-payment">
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <Box
                  key="action-pay-full"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  className={classes.buttonPayFull}
                >
                  <Check color="action" fontSize="large" />
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
            <CheckoutForm />
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
        <DialogActions className={classes.actionContainer}>
          <ButtonForward
            key="finish-booking"
            title="Finish booking"
            size="large"
            rounded
            onClickHandler={handleFinishBooking}
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

ModalFinishBooking.defaultProps = {};

export default ModalFinishBooking;
