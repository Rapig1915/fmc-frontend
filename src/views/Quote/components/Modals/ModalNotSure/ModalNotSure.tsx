import React, { ReactElement, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { ArrowBackIos, Close } from '@material-ui/icons';

import { ButtonForward } from 'src/components/atoms';
import { QuoteContext } from 'src/views/Quote/QuoteContext';
import ModalReasonAccordion from './ModalReasonAccordion';
import ModalReasonOther from './ModalReasonOther';
import ModalReasonCheck from './ModalReasonCheck';

interface ModalNotSureProps {
  show: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
    textAlign: 'center',
    padding: theme.spacing(4),
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

  reasonTitle: {
    fontSize: 18,
    lineHeight: '21px',
    fontWeight: 600,
    color: '#79739C',
  },

  actionContainer: {
    padding: theme.spacing(2),
    textAlign: 'center',
    justifyContent: 'center',
    margin: theme.spacing(2),
  },
}));

enum ReasonStep {
  START = 0,
  OTHER = 1,
  CHECK = 2,
}

const ModalNotSure = (props: ModalNotSureProps): ReactElement => {
  const { show, onClose, onContinue } = props;
  const classes = useStyles();

  const [reasonStep, setReasonStep] = useState(ReasonStep.START);

  React.useEffect(() => {
    const dialogContainer = document.getElementsByClassName(
      'MuiDialog-container'
    )[0];
    if (dialogContainer) {
      dialogContainer.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [reasonStep]);

  const { reason, handleSetReason } = useContext(QuoteContext);

  const handleMainReasonChange = (id: number, r: string, subR: string[]) => {
    handleSetReason({
      reasonId: id,
      reason: r,
      subReason: subR,
      otherReason: '',
      note: '',
    });
  };

  const handleOtherReasonChange = (s: string) => {
    handleSetReason({
      ...reason,
      otherReason: s,
      note: '',
    });
  };

  const handleNoteChange = (n: string) => {
    handleSetReason({
      ...reason,
      note: n,
    });
  };

  const handleStepBack = () => {
    if (reasonStep === ReasonStep.OTHER) setReasonStep(ReasonStep.START);
    else if (reasonStep === ReasonStep.CHECK)
      setReasonStep(reason.otherReason ? ReasonStep.OTHER : ReasonStep.START);
    else onClose();
  };

  const handleContinue = () => {
    if (reasonStep === ReasonStep.START) {
      if (reason.reasonId && reason.reason && reason.subReason[0] !== 'Other')
        setReasonStep(ReasonStep.CHECK);
      else if (reason.subReason[0] === 'Other') setReasonStep(ReasonStep.OTHER);
    } else if (reasonStep === ReasonStep.OTHER) {
      if (
        reason.reasonId &&
        reason.reason &&
        reason.subReason[0] === 'Other' &&
        reason.otherReason
      )
        setReasonStep(ReasonStep.CHECK);
    } else if (reasonStep === ReasonStep.CHECK) {
      onContinue();
    }
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
          <ArrowBackIos className="title-icon" onClick={handleStepBack} />
        </Box>
        <Typography className={classes.titleText}>
          Not sure what&apos;s wrong?
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
        {reasonStep === ReasonStep.START && (
          <ModalReasonAccordion
            reasonId={reason.reasonId}
            subReason={reason.subReason}
            onChange={handleMainReasonChange}
          />
        )}
        {reasonStep === ReasonStep.OTHER && (
          <ModalReasonOther
            reason={reason.reason}
            otherReason={reason.otherReason}
            onOtherReasonChange={handleOtherReasonChange}
          />
        )}
        {reasonStep === ReasonStep.CHECK && (
          <ModalReasonCheck
            reason={reason.reason}
            note={reason.note}
            onNoteChange={handleNoteChange}
          />
        )}
      </DialogContent>
      <DialogActions className={classes.actionContainer}>
        <ButtonForward
          key="button-continue"
          title="Continue"
          size="large"
          rounded
          onClickHandler={handleContinue}
        />
      </DialogActions>
    </Dialog>
  );
};

ModalNotSure.defaultProps = {};

export default ModalNotSure;
