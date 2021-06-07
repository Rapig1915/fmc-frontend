import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import { ButtonForward, Image } from 'src/components/atoms';
import { URL } from 'src/utils/consts';

interface SimpleCongratsProps {
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: theme.spacing(4),
    maxWidth: 400,
    minHeight: 400,

    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: 0,
      left: 0,
      maxWidth: '100%',
      width: '100%',
      height: '100%',
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  titleText: {
    fontFamily: 'Pacifico',
    color: '#2A2D3C',
    fontSize: 45,
    lineHeight: '28px',
    fontWeight: 700,
    textAlign: 'center',
    zIndex: 100,
  },
  subTitleText: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(10),
    color: '#7E7A92',
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 400,
    maxWidth: 300,
    textAlign: 'center',
    zIndex: 100,
  },
  titleBgImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  },
}));

const SimpleCongrats = (props: SimpleCongratsProps): ReactElement => {
  const { className } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleDone = () => {
    history.push(URL.HOME);
  };

  return (
    <Box className={clsx(className, classes.root)}>
      <Image
        src="/assets/congrats-bg.svg"
        className={classes.titleBgImg}
        lazy={false}
      />
      <Typography key="title" className={classes.titleText}>
        Congrats!
      </Typography>
      <Typography key="subtitle" className={classes.subTitleText}>
        What&apos;s next? You will receive a detailed quote from a service
        advisor.
      </Typography>
      <ButtonForward
        key="done"
        title="Go to dashboard"
        size="large"
        rounded
        onClickHandler={handleDone}
      />
    </Box>
  );
};

SimpleCongrats.defaultProps = {
  className: undefined,
};

export default SimpleCongrats;
