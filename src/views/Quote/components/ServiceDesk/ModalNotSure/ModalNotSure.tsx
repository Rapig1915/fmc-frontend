import React, { ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { ButtonForward } from 'src/components/atoms';
import { Close } from '@material-ui/icons';
import ModalReasonAccordion from './ModalReasonAccordion';
import ModalReasonOther from './ModalReasonOther';
import ModalReasonCheck from './ModalReasonCheck';

interface ModalNotSureProps {
  show: boolean;
  onClose: () => void;
  onGoToReview: () => void;
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
  const { show, onClose, onGoToReview } = props;
  const classes = useStyles();

  const [reasonStep, setReasonStep] = useState(ReasonStep.START);
  const [reasonData, setReasonData] = useState({
    reasonId: 0,
    reason: '',
    subReason: '',
    otherReason: '',
    note: '',
  });

  const handleMainReasonChange = (
    id: number,
    reason: string,
    subReason: string
  ) => {
    setReasonData((state) => ({
      ...state,
      reasonId: id,
      reason,
      subReason,
      otherReason: '',
      note: '',
    }));
  };

  const handleOtherReasonChange = (s: string) => {
    setReasonData((state) => ({
      ...state,
      otherReason: s,
      note: '',
    }));
  };

  const handleNoteChange = (n: string) => {
    setReasonData((state) => ({
      ...state,
      note: n,
    }));
  };

  const handleContinue = () => {
    if (reasonStep === ReasonStep.START) {
      if (
        reasonData.reasonId &&
        reasonData.reason &&
        reasonData.subReason !== 'Other'
      )
        setReasonStep(ReasonStep.CHECK);
      else if (reasonData.subReason === 'Other')
        setReasonStep(ReasonStep.OTHER);
    } else if (reasonStep === ReasonStep.OTHER) {
      if (
        reasonData.reasonId &&
        reasonData.reason &&
        reasonData.subReason === 'Other' &&
        reasonData.otherReason
      )
        setReasonStep(ReasonStep.CHECK);
    } else if (reasonStep === ReasonStep.CHECK) {
      onGoToReview();
    }
  };

  const handleStartOver = () => {
    setReasonStep(ReasonStep.START);
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
            reasonId={reasonData.reasonId}
            subReason={reasonData.subReason}
            onChange={handleMainReasonChange}
          />
        )}
        {reasonStep === ReasonStep.OTHER && (
          <ModalReasonOther
            reason={reasonData.reason}
            otherReason={reasonData.otherReason}
            onOtherReasonChange={handleOtherReasonChange}
          />
        )}
        {reasonStep === ReasonStep.CHECK && (
          <ModalReasonCheck
            reason={reasonData.reason}
            note={reasonData.note}
            onNoteChange={handleNoteChange}
          />
        )}
      </DialogContent>
      <DialogActions className={classes.actionContainer}>
        <ButtonForward
          key="button-start-over"
          title="Start Over"
          color="secondary"
          size="large"
          rounded
          noIcon
          onClickHandler={handleStartOver}
        />
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
