import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import { TabSelector } from 'src/components/molecules';
import ButtonForward from 'src/components/atoms/ButtonForward';
import { arrCarSelectTypes } from 'src/utils/data';
import { CarSelectType } from 'src/types';
import FormPlateNumber from './FormPlateNumber';
import FormYearMakeModel from './FormYearMakeModel';
import FormConfirmCar from './FormConfirmCar';

interface SearchCarProps {
  className?: string;
  onConfirm?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 23,
    lineHeight: '28px',
    fontWeight: 800,
    marginBottom: theme.spacing(3),
  },

  contentContainer: {
    flexGrow: 1,
  },

  actionContainer: {
    minHeight: 70,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
}));

const SearchCar = (props: SearchCarProps): ReactElement => {
  const { className, onConfirm } = props;

  const classes = useStyles();

  const [carSelectType, setCarSelectType] = useState(
    Object.keys(arrCarSelectTypes)[0]
  );

  const onCarOptionSelected = (key: string) => {
    setCarSelectType(key);
  };

  const [isReadyToSearch, setIsReadyToSearch] = useState(true);
  const [isReadyToConfirm, setIsReadyToConfirm] = useState(false);

  const handleSearch = () => {
    setIsReadyToConfirm(true);
  };

  const handleConfirm = () => {
    setIsReadyToSearch(false);
    if (onConfirm) onConfirm();
  };

  return (
    <Box className={clsx('quote-search-car', classes.root, className)}>
      <Typography className={classes.title}>Tell us about your car?</Typography>
      <Grid container className={classes.contentContainer}>
        <Grid item md={8} sm={8} xs={12}>
          <TabSelector
            items={arrCarSelectTypes}
            onTabSelected={onCarOptionSelected}
            selectedValue={carSelectType}
            disabled={isReadyToConfirm}
          />
          <FormPlateNumber
            show={
              !isReadyToConfirm &&
              carSelectType === CarSelectType.BY_PLATE_NUMBER
            }
          />
          <FormYearMakeModel
            show={
              !isReadyToConfirm &&
              carSelectType === CarSelectType.BY_YEAR_MAKE_MODEL
            }
          />
          <FormConfirmCar show={isReadyToConfirm} />
        </Grid>
        <Grid item md={4} sm={4} xs={12} className={classes.actionContainer}>
          {!isReadyToConfirm ? (
            <ButtonForward
              title="Search"
              rounded
              size="large"
              disabled={!isReadyToSearch}
              onClickHandler={handleSearch}
            />
          ) : (
            <ButtonForward
              title="Confirm"
              rounded
              size="large"
              onClickHandler={handleConfirm}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

SearchCar.defaultProps = {
  className: undefined,
  onConfirm: undefined,
};

export default SearchCar;
