import React, { ChangeEvent, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'src/components/organisms';

interface ModalReasonOtherProps {
  reason: string;
  note: string;
  onNoteChange: (val: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    textAlign: 'center',
    padding: theme.spacing(2),
    color: '#2A2D3C',
    fontSize: 23,
    lineHeight: '24px',
    fontWeight: 900,

    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
  textSelectedServices: {
    fontSize: 18,
    lineHeight: '21px',
    fontWeight: 700,
    color: '#2A2D3C',
    float: 'left',
  },
  textLeaveNote: {
    fontSize: 16,
    lineHeight: '21px',
    fontWeight: 600,
    color: '#7157FF',
    float: 'right',
  },
  inputNoteContainer: {
    margin: 0,
    border: '2px solid #EBF1FA',
    borderRadius: 6,
    minWidth: 450,
    minHeight: 300,
    [theme.breakpoints.down('xs')]: {
      minWidth: 200,
    },
  },
  inputNote: {
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
  reasonTitle: {
    fontSize: 18,
    lineHeight: '21px',
    fontWeight: 600,
    color: '#7157FF',
    background: '#EBF1FA',
    margin: 0,
  },

  inspectContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(1),
  },
  inspectTitle: {
    marginTop: theme.spacing(0.5),
    fontSize: 18,
    lineHeight: '28px',
    color: '#2A2D3C',
    fontWeight: 600,
    textAlign: 'left',
  },
  inspectContent: {
    marginLeft: theme.spacing(2),
    fontSize: 16,
    lineHeight: '28px',
    color: '#7E7A92',
    fontWeight: 400,
    textAlign: 'left',
  },
}));

const ModalReasonOther = (props: ModalReasonOtherProps): ReactElement => {
  const { reason, note, onNoteChange } = props;
  const classes = useStyles();

  const handleChange = (evt: ChangeEvent<{ value: unknown }>) => {
    const v = evt.target.value as string;
    onNoteChange(v);
  };

  return (
    <Box className={clsx('quote-service-modal-not-sure-check', classes.root)}>
      <Box style={{ display: 'block', height: 30 }}>
        <Typography className={classes.textSelectedServices}>
          Selected Services
        </Typography>
        <Typography className={classes.textLeaveNote}>Leave a note</Typography>
      </Box>
      <Box className={classes.inputNoteContainer}>
        <TextField
          className={classes.inputNote}
          onChange={handleChange}
          value={note}
          multiline
          placeholder="Type something here"
        />
      </Box>
      <Accordion square expanded>
        <AccordionSummary>
          <Typography className={classes.reasonTitle}>
            Inspection: {reason}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className={classes.inspectContainer}>
            <Typography className={classes.inspectTitle} key="title-1">
              1. Possible repairs
            </Typography>
            <Typography className={classes.inspectContent} key="content-1-1">
              Replace Catalytic Converter
            </Typography>
            <Typography className={classes.inspectContent} key="content-1-2">
              Replace Muffler
            </Typography>
            <Typography className={classes.inspectTitle} key="title-2">
              2. What&apos;s next?
            </Typography>
            <Typography className={classes.inspectContent} key="content-2-1">
              Our certified mechanic will perform an inspection & provide a
              fixed upfront estimate.
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

ModalReasonOther.defaultProps = {};

export default ModalReasonOther;
