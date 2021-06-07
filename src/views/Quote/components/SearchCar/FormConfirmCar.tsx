import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Image, SelectWithStatus } from 'src/components/atoms';
import { allBrands, allModels, allMotors } from 'src/utils/data';

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
    marginBottom: theme.spacing(3),
  },
  myCar: {
    padding: theme.spacing(2),
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

  const optionYear = Array(50)
    .fill(0)
    .reduce((obj, x, index) => {
      return {
        ...obj,
        [2021 - index]: 2021 - index,
      };
    }, {});

  return (
    <Box className={clsx('quote-confirm-car', classes.root, className)}>
      <Typography className={classes.title}>Is this your car?</Typography>
      <Image src="/assets/sample-car.png" className={classes.myCar} />

      <Box className={classes.lineContainer}>
        <Typography className={classes.lineLabel}>Year</Typography>
        <SelectWithStatus
          key="select-brand"
          className={classes.flexGrow}
          label="Year"
          items={optionYear}
          defaultValue="2021"
          disabled
        />
      </Box>
      <Box className={classes.lineContainer}>
        <Typography className={classes.lineLabel}>Brand</Typography>
        <SelectWithStatus
          key="select-brand"
          className={classes.flexGrow}
          label="Brand"
          items={allBrands}
          defaultValue="Audi"
          disabled
        />
      </Box>
      <Box className={classes.lineContainer}>
        <Typography className={classes.lineLabel}>Model</Typography>
        <SelectWithStatus
          key="select-model"
          className={classes.flexGrow}
          label="Model"
          items={allModels}
          defaultValue="V3"
          disabled
        />
      </Box>
      <Box className={classes.lineContainer}>
        <Typography className={classes.lineLabel}>Motor</Typography>
        <SelectWithStatus
          key="select-motor"
          className={classes.flexGrow}
          label="Motor"
          items={allMotors}
          defaultValue="MM1"
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
