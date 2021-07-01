import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { Close } from '@material-ui/icons';
import ServiceIntro from '../ServiceIntro';

interface ModalServiceIntroProps {
  show: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    paddingTop: 0,
    margin: 0,
  },
  closeButton: {
    position: 'absolute',
    background: '#625993',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#D5C3F2',
    zIndex: 1,
  },
}));

const ModalServiceIntro = (props: ModalServiceIntroProps): ReactElement => {
  const { show, onClose } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
      className={classes.root}
    >
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={onClose}
      >
        <Close />
      </IconButton>
      <ServiceIntro modalView />
    </Dialog>
  );
};

ModalServiceIntro.defaultProps = {};

export default ModalServiceIntro;
