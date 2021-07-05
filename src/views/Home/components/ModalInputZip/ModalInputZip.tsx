import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { ZipcodeQuote } from 'src/components/molecules';

interface ModalInputZipProps {
  show: boolean;
  className?: string;
  onClose?: () => void;
  onGetQuote?: (payload: { zip?: string; customer?: number }) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

    '&:first-child': {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  zipQuote: {
    margin: theme.spacing(2),
  },
}));

const ModalInputZip = (props: ModalInputZipProps): ReactElement => {
  const { className, show, onGetQuote, ...rest } = props;
  const classes = useStyles();

  return (
    <Dialog open={show} scroll="body" {...rest}>
      <DialogContent className={clsx(classes.root, className)}>
        <ZipcodeQuote className={classes.zipQuote} onGetQuote={onGetQuote} />
      </DialogContent>
    </Dialog>
  );
};

ModalInputZip.defaultProps = {
  className: undefined,
  onClose: undefined,
  onGetQuote: undefined,
};

export default ModalInputZip;
