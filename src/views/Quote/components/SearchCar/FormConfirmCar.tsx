import React, { ReactElement, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Image, InputWithStatus } from 'src/components/atoms';

import ImageBrand from 'src/assets/brands';

import { QuoteContext } from '../../QuoteContext';

interface FormConfirmCarProps {
  className?: string;
  show: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: (props: FormConfirmCarProps) => (props.show ? 'flex' : 'none'),
    flexDirection: 'column',
    background: theme.palette.common.white,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
  },
  title: {
    color: '#2A2D3C',
    fontSize: 19,
    letterSpacing: 0,
    lineHeight: '23px',
    fontWeight: 900,
  },
  myCar: {
    padding: theme.spacing(2),
    maxHeight: 300,
    objectFit: 'contain',
  },

  lineContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  lineLabel: {
    color: '#7E7A92',
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: '23px',
    fontWeight: 600,
    maxWidth: 60,
    width: 60,
    textAlign: 'right',
  },

  flexGrow: {
    flexGrow: 1,
  },

  actionContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
}));

const FormConfirmCar = (props: FormConfirmCarProps): ReactElement => {
  const { className, show } = props;

  const classes = useStyles({ show });

  const { car } = useContext(QuoteContext);

  const keyBrand = car.attributes.make.replace(' ', '-').toLocaleLowerCase();
  const imageBrand = ImageBrand[keyBrand] || ImageBrand.blank;

  return (
    <Box className={clsx('quote-confirm-car', classes.root, className)}>
      <Typography className={classes.title}>Is this your car?</Typography>
      <Image src={imageBrand} className={classes.myCar} />

      <Box className={classes.lineContainer}>
        <Typography className={classes.lineLabel}>Year</Typography>
        <InputWithStatus
          className={classes.flexGrow}
          value={car.attributes.year}
          disabled
        />
      </Box>
      <Box className={classes.lineContainer}>
        <Typography className={classes.lineLabel}>Make</Typography>
        <InputWithStatus
          className={classes.flexGrow}
          value={car.attributes.make}
          disabled
        />
      </Box>
      <Box className={classes.lineContainer}>
        <Typography className={classes.lineLabel}>Model</Typography>
        <InputWithStatus
          className={classes.flexGrow}
          value={car.attributes.model}
          disabled
        />
      </Box>
      <Box className={classes.lineContainer}>
        <Typography className={classes.lineLabel}>Motor</Typography>
        <InputWithStatus
          className={classes.flexGrow}
          value={car.attributes.engine_size}
          disabled
        />
      </Box>
    </Box>
  );
};

FormConfirmCar.defaultProps = {
  className: undefined,
};

export default FormConfirmCar;
