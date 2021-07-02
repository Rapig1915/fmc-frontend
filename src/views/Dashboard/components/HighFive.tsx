import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Image } from 'src/components/atoms';
import ImageHighFive from 'src/assets/high-five.png';
import ImageCongratsBg from 'src/assets/congrats-bg.png';
import { useSelector } from 'react-redux';
import { IReduxState } from 'src/store/reducers';

interface HighFiveProps {
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  imageBack: {
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    width: '100%',
    maxHeight: '50%',
    objectFit: 'cover',
    zIndex: 1,
  },
  content: {
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    width: '100%',
    minHeight: 150,
    background: '#302A3C',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imageSpark: {
    width: '100%',
    padding: theme.spacing(1),
    height: 'auto',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  textRefer: {
    color: theme.palette.common.white,
    fontSize: 18.2,
    lineHeight: '27px',
    fontWeight: 400,
    zIndex: 2,
  },
  textGift: {
    color: theme.palette.common.white,
    fontSize: 18.2,
    lineHeight: '27px',
    fontWeight: 700,
    zIndex: 2,
  },
  clipboard: {
    cursor: 'pointer',
  },
}));

const HighFive = (props: HighFiveProps): ReactElement => {
  const { className } = props;
  const user = useSelector((state: IReduxState) => state.auth.user);
  const code = user?.attributes.referral_code || '';

  const classes = useStyles();

  return (
    <Box className={clsx('dashboard-high-five', classes.root, className)}>
      <Image lazy={false} className={classes.imageBack} src={ImageHighFive} />
      <Box className={classes.content}>
        <Image
          lazy={false}
          className={classes.imageSpark}
          src={ImageCongratsBg}
        />
        <Typography key="refer" className={classes.textRefer}>
          Give $20, Get $20
        </Typography>
        <Typography key="gift" className={classes.textGift}>
          Share your code
        </Typography>
        <Typography
          onClick={() => navigator.clipboard.writeText(code)}
          className={clsx(classes.textRefer, classes.clipboard)}
        >
          {code}
        </Typography>
      </Box>
    </Box>
  );
};

HighFive.defaultProps = {
  className: undefined,
};

export default HighFive;
