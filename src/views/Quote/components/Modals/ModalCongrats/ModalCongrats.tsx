import React, { ReactElement, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
  Link,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { Close } from '@material-ui/icons';
import DialogContent from '@material-ui/core/DialogContent';

import { ButtonForward, Image } from 'src/components/atoms';
import { ImageNode } from 'src/components/molecules';
import { URL } from 'src/utils/consts';

import SvgCongratsBg from 'src/assets/congrats-bg.svg';
import SvgQuestion from 'src/assets/badges/question-primary.svg';
import SvgInformation from 'src/assets/badges/information-primary.svg';
import { QuoteShowModal, ResponseSignin } from 'src/types';
import { signIn } from 'src/api/auth';
import { IReduxState } from 'src/store/reducers';
import { setAppointment, setAuthToken } from 'src/store/actions';
import { QuoteContext } from 'src/views/Quote/QuoteContext';

import HelperQuestions from './HelperQuestions';

interface ModalCongratsProps {
  show: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 600,
    [theme.breakpoints.down('sm')]: {
      minWidth: 250,
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  title: {
    margin: 0,
    padding: 0,
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(6),
    position: 'relative',
  },
  titleText: {
    fontFamily: 'Pacifico',
    color: '#2A2D3C',
    fontSize: 45,
    lineHeight: '28px',
    fontWeight: 700,
    textAlign: 'center',
    zIndex: 100,
  },
  subTitleText: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: '#7E7A92',
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 400,
    maxWidth: 500,
    textAlign: 'center',
    zIndex: 100,
  },
  titleBgImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  actionContainer: {
    width: '100%',
    justifyContent: 'center',
  },

  titleDatetime: {
    fontWeight: 900,
    fontSize: 24,
    lineHeight: '32.8px',
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
  boxInformation: {
    width: '100%',
    background: '#EBF1FA',
    borderRadius: 6,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  containerQuestion: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  imgQuestion: {
    width: 40,
    height: 40,
    objectFit: 'contain',
    marginRight: theme.spacing(2),
  },
  titleQuestion: {
    color: '#7E7A92',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: '20px',
    '& b': {
      color: '#302A3C',
      fontWeight: 800,
    },
    '& .arrow': {
      position: 'absolute',
      top: 0,
      right: theme.spacing(1),
      height: '100%',
      width: 25,
      color: '#BDC1DA',
      cursor: 'pointer',
    },
  },
  titlePhone: {
    color: '#7E7A92',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: 15,
    lineHeight: '20px',
    textDecoration: 'none',
  },
  helperQuestion: {
    marginBottom: theme.spacing(3),
  },
}));

const ModalCongrats = (props: ModalCongratsProps): ReactElement => {
  const { show, onClose } = props;
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    clearAll,
    handleSetLoggingIn,
    handleShowModal,
    loggingIn,
    isEstimateResponse,
  } = useContext(QuoteContext);

  const appointment = useSelector(
    (state: IReduxState) => state.quote.appointment
  );

  const handleDone = () => {
    handleShowModal(QuoteShowModal.NONE);
    handleSetLoggingIn(true);

    const timerId = setTimeout(async () => {
      const response: ResponseSignin = await signIn(
        {
          id: `${appointment && appointment.id}`,
        },
        true
      );

      clearAll();
      dispatch(setAppointment(null));
      handleSetLoggingIn(false);

      if (
        response &&
        response.auth_token &&
        response.user &&
        response.user.id
      ) {
        dispatch(
          setAuthToken(
            response.auth_token,
            response.user.id,
            response.user.email
          )
        );

        history.push(URL.DASHBOARD);
      } else {
        history.push(URL.HOME);
      }

      if (timerId) clearTimeout(timerId);
    }, 3000);
  };

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
    >
      <DialogTitle className={classes.title}>
        <Box className={classes.container}>
          <Image
            src={SvgCongratsBg}
            className={classes.titleBgImg}
            lazy={false}
          />
          <Typography key="title" className={classes.titleText}>
            {isEstimateResponse ? 'Success!' : 'Congrats!'}
          </Typography>
          <Typography key="subtitle" className={classes.subTitleText}>
            {isEstimateResponse
              ? 'Your appointment is scheduled and we will text you when your FixMyCar mechanic confirms your appointment!'
              : 'You should hear from us in the next 2-hours.'}
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent className={classes.root}>
        {!isEstimateResponse && (
          <Box key="payment" className={classes.boxInformation}>
            <ImageNode
              key="questions"
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
              titleProps={{ className: classes.titleQuestion }}
              imgProps={{ className: classes.imgQuestion }}
              className={classes.containerQuestion}
            />
            <ImageNode
              key="next-steps"
              title={
                <>
                  <b>Next steps:</b>
                  <br />
                  See your service request in your Active
                </>
              }
              imgUrl={SvgInformation}
              titleProps={{ className: classes.titleQuestion }}
              imgProps={{ className: classes.imgQuestion }}
              className={classes.containerQuestion}
            />
          </Box>
        )}
        {!isEstimateResponse && (
          <Typography className={classes.titleDatetime} noWrap>
            Help us know your car
          </Typography>
        )}
        {!isEstimateResponse && (
          <HelperQuestions className={clsx(classes.helperQuestion)} />
        )}
        <DialogActions className={classes.actionContainer}>
          <ButtonForward
            key="done"
            title="Done"
            size="large"
            rounded
            onClickHandler={handleDone}
            disabled={loggingIn}
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

ModalCongrats.defaultProps = {};

export default ModalCongrats;
