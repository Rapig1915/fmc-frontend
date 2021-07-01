import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DialogTitle, IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Close } from '@material-ui/icons';
import FormContact from '../FormContact';

interface ModalContactProps {
  show: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 500,
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
    },
  },
  title: {
    margin: 0,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const ModalContact = (props: ModalContactProps): ReactElement => {
  const { show, onClose } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
    >
      <DialogTitle className={classes.title}>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.root}>
        <FormContact modalView />
      </DialogContent>
    </Dialog>
  );
};

ModalContact.defaultProps = {};

export default ModalContact;
