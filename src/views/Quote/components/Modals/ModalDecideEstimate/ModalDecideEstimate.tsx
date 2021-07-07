import React, { ReactElement, useContext } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import { Close } from '@material-ui/icons';
import { QuoteContext } from 'src/views/Quote/QuoteContext';
import { ButtonForward } from 'src/components/atoms';
import { QuoteShowModal } from 'src/types';
import { IReduxState } from 'src/store/reducers';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
    textAlign: 'center',
    padding: theme.spacing(4),

    '& .hidden': {
      display: 'none',
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

  guideText: {
    fontSize: 18,
    lineHeight: '21px',
    fontWeight: 600,
    color: '#79739C',
    textAlign: 'center',
  },

  actionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-evenly',
    justifyContent: 'space-evenly',
    minHeight: 150,
    minWidth: 320,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

interface ModalDecideEstimateProps {
  show: boolean;
  onClose: () => void;
}

const ModalDecideEstimate = (props: ModalDecideEstimateProps): ReactElement => {
  const { show, onClose } = props;

  const classes = useStyles();

  const appointmentId = useSelector(
    (state: IReduxState) => state.quote.appointment?.id
  );

  const { handleShowModal, handleRespondAppointmentEstimate } = useContext(
    QuoteContext
  );

  const handleFixNow = async () => {
    handleRespondAppointmentEstimate({
      appointment: {
        id: appointmentId,
        mechanic_already_here: '1',
      },
    });
  };

  const handleSchedule = () => {
    handleShowModal(QuoteShowModal.SCHEDULE_SERVICE);
  };

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
    >
      <DialogTitle className={classes.title}>
        <Typography className={classes.titleText}>
          Schedule Appointment
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Typography className={classes.guideText}>
          Select one of the options.
        </Typography>
      </DialogContent>
      <DialogActions className={classes.actionContainer}>
        <ButtonForward
          key="button-fix-now"
          title="My mechanic is here. Fix Now!"
          size="large"
          noIcon
          onClickHandler={handleFixNow}
        />
        <ButtonForward
          key="button-scheduler-later"
          title="Schedule for Later"
          size="large"
          noIcon
          onClickHandler={handleSchedule}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ModalDecideEstimate;
