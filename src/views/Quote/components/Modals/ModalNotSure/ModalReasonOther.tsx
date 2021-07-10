import React, { ChangeEvent, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import mixPanel from 'src/utils/mixpanel';
import { MIXPANEL_TRACK } from 'src/utils/consts';

interface ModalReasonOtherProps {
  reason: string;
  otherReason: string;
  onOtherReasonChange: (val: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    textAlign: 'left',
    border: '2px solid #EBF1FA',
    borderRadius: 6,
    minWidth: 450,
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('xs')]: {
      minWidth: 200,
    },
  },
  majorReason: {
    fontSize: 18,
    padding: theme.spacing(2),
    lineHeight: '21px',
    fontWeight: 600,
    color: '#7157FF',
    background: '#EBF1FA',
  },

  inputReason: {
    width: '100%',
    height: '100%',
    flexGrow: 1,
    minHeight: 100,
    '& .MuiOutlinedInput-input': {
      fontSize: 18,
      lineHeight: '21px',
      fontWeight: 400,
      color: '#A2A1A8',
    },
    '& .MuiInputBase-inputMultiline': {
      border: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}));

const ModalReasonOther = (props: ModalReasonOtherProps): ReactElement => {
  const { reason, otherReason, onOtherReasonChange } = props;
  const classes = useStyles();

  React.useEffect(() => {
    mixPanel(MIXPANEL_TRACK.NOT_SURE_WHATS_WRONG_TEXTBOX);
  });

  const handleChange = (evt: ChangeEvent<{ value: string }>) => {
    const v = evt.target.value as string;
    onOtherReasonChange(v);
  };

  return (
    <Box
      className={clsx(
        'quote-service-modal-not-sure-reason-other',
        classes.root
      )}
    >
      <Box>
        <Typography className={classes.majorReason}>
          {reason} &gt; Other
        </Typography>
      </Box>
      <TextField
        className={classes.inputReason}
        onChange={handleChange}
        value={otherReason}
        placeholder="Type here to describe your problem"
        multiline
      />
    </Box>
  );
};

ModalReasonOther.defaultProps = {};

export default ModalReasonOther;
