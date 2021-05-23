import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Box, Typography } from '@material-ui/core';
import {
  SectionHeader,
  TabSelector,
  ZipcodeQuote,
} from 'src/components/molecules';

interface CheckStepProps {
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 23,
    lineHeight: '28px',
    fontWeight: 800,
    marginBottom: theme.spacing(3),
  },
}));

const CheckStep = (props: CheckStepProps): ReactElement => {
  const { className } = props;

  const classes = useStyles();

  const onCarOptionSelected = (index: number, text: string) => {
    console.log(index, text);
  };

  return (
    <Box className={clsx('quote-search-car', classes.root, className)}>
      <Typography className={classes.title}>Tell us about your car?</Typography>
      <TabSelector
        items={['Plate number', 'Year/make/model']}
        onTabSelected={onCarOptionSelected}
        selectedIndex={0}
      />
    </Box>
  );
};

CheckStep.defaultProps = {
  className: undefined,
};

export default CheckStep;
