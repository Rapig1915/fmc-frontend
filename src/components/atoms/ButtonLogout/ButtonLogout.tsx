import React, { ReactElement } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

interface ButtonLogoutProps {
  className?: string;
  onClickHandler?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    border: 0,
    background: 'transparent',
    textTransform: 'none',
    boxShadow: 'none',

    '& .MuiButton-label': {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  icon: {
    width: 30,
    height: 30,
    background: '#EBF1FA',
    borderRadius: 30,
    padding: theme.spacing(0.7),
    marginRight: theme.spacing(1),
  },
  text: {
    fontStyle: 'normal',
    fontWeight: 400,
    fotnSize: 18.2,
    color: '#302A3C',
  },
}));

export default function ButtonLogout(props: ButtonLogoutProps): ReactElement {
  const { className, onClickHandler } = props;

  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={clsx(classes.root, className)}
      onClick={onClickHandler}
    >
      <ExitToApp className={classes.icon} />
      <Typography className={classes.text}>Log out</Typography>
    </Button>
  );
}

ButtonLogout.defaultProps = {
  className: undefined,
  onClickHandler: undefined,
};
