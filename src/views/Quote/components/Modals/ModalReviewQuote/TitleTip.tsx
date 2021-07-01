import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ImageBackTip from 'src/assets/tooltip-back.png';

const useStyles = makeStyles((theme) => ({
  root: {
    color: '#79739C',
    fontSize: 16,
    lineHeight: '19.2px',
    position: 'absolute',
    top: -8,
    left: '55%',
    zIndex: 0,
    padding: theme.spacing(1.5),
    borderRadius: 10,
    background: `url(${ImageBackTip})`,
    backgroundRepeat: 'no-repeat',

    [theme.breakpoints.down('sm')]: {
      left: '58%',
    },
  },
}));

const TitleTip = (): ReactElement => {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      $25 travel fee if can&apos;t find a fix
    </Typography>
  );
};

export default TitleTip;
