import React, { ReactElement, useEffect, useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { Box, Grid, Typography } from '@material-ui/core';
import { TabSelector } from 'src/components/molecules';
import ButtonForward from 'src/components/atoms/ButtonForward';
import { arrCarSelectTypes } from 'src/utils/data';
import { ICarMeta, CarSelectType, QuoteStep } from 'src/types';
import { checkPlateNumber } from 'src/api/quote';
import mixPanel from 'src/utils/mixpanel';
import { MIXPANEL_TRACK } from 'src/utils/consts';
import FormPlateNumber from './FormPlateNumber';
import FormYearMakeModel from './FormYearMakeModel';
import FormConfirmCar from './FormConfirmCar';
import { QuoteContext } from '../../QuoteContext';

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
    width: '100%',
    minHeight: 70,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',

    '& .button-mobile-info': {
      width: 45,
      height: 45,
    },
  },
  buttonBack: {
    marginRight: theme.spacing(1),
  },
  buttonContinue: {
    maxWidth: 150,
    float: 'right',
  },
}));

const SearchCar = (props: SearchCarProps): ReactElement => {
  const { className, onConfirm } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [carSelectType, setCarSelectType] = useState(
    Object.keys(arrCarSelectTypes)[0]
  );

  const { car, handleSetCar, handleSetStep, requestInProgress } = useContext(
    QuoteContext
  );

  const isReadyToSearch =
    (carSelectType === CarSelectType.BY_PLATE_NUMBER &&
      !!car.search.plate_number &&
      !!car.search.state) ||
    (carSelectType === CarSelectType.BY_YEAR_MAKE_MODEL &&
      !!car.attributes.year &&
      !!car.attributes.make &&
      !!car.attributes.model &&
      !!car.attributes.engine_size);
  const [isReadyToConfirm, setIsReadyToConfirm] = useState(false);

  const onCarOptionSelected = (key: string) => {
    setIsReadyToConfirm(false);

    setCarSelectType(key);
  };

  const handleBack = () => {
    if (isReadyToConfirm) setIsReadyToConfirm(false);
    else handleSetStep(QuoteStep.QUOTE_SERVICE_DESK);
  };

  const showCommonError = () => {
    enqueueSnackbar('Error occured in searching your car.', {
      variant: 'error',
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    });
  };

  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (carSelectType === CarSelectType.BY_PLATE_NUMBER) {
      if (!car.search.plate_number || !car.search.state) return;

      setSearching(true);

      checkPlateNumber(car.search.plate_number, car.search.state)
        .then((resp) => {
          if (!resp || !resp.specifications) {
            return;
          }

          const carMeta: ICarMeta = resp.specifications;

          if (!carMeta) return;

          handleSetCar({
            ...car,
            attributes: {
              year: carMeta.year,
              make: carMeta.make,
              model: carMeta.model,
              engine_size: carMeta.engine,
              mileage: '',
              vin: carMeta.vin,
            },
          });

          setIsReadyToConfirm(true);
        })
        .catch(() => showCommonError())
        .finally(() => setSearching(false));
    } else {
      if (
        !car.attributes.year ||
        !car.attributes.make ||
        !car.attributes.model ||
        !car.attributes.engine_size
      )
        return;

      setIsReadyToConfirm(true);
      if (onConfirm) onConfirm();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  useEffect(() => {
    mixPanel(MIXPANEL_TRACK.CAR);
  });

  return (
    <Box className={clsx('quote-search-car', classes.root, className)}>
      <Typography className={classes.title}>Tell us about your car</Typography>
      <Grid container className={classes.contentContainer}>
        <Grid item md={8} sm={12} xs={12}>
          <TabSelector
            items={arrCarSelectTypes}
            onTabSelected={onCarOptionSelected}
            selectedValue={carSelectType}
          />
          <FormPlateNumber
            show={
              !isReadyToConfirm &&
              carSelectType === CarSelectType.BY_PLATE_NUMBER
            }
          />
          <FormYearMakeModel
            show={carSelectType === CarSelectType.BY_YEAR_MAKE_MODEL}
          />
          {carSelectType === CarSelectType.BY_PLATE_NUMBER && (
            <FormConfirmCar show={isReadyToConfirm} type={carSelectType} />
          )}
        </Grid>
        <Grid item md={4} sm={12} xs={12} className={classes.actionContainer}>
          <ButtonForward
            title="Back"
            key="Back"
            color="default"
            rounded
            noIcon
            transparent
            size="large"
            onClickHandler={handleBack}
            className={classes.buttonBack}
          />
          {!isReadyToConfirm ? (
            <ButtonForward
              title={
                carSelectType === CarSelectType.BY_PLATE_NUMBER
                  ? 'Search'
                  : 'Continue'
              }
              key={
                carSelectType === CarSelectType.BY_PLATE_NUMBER
                  ? 'Search'
                  : 'Continue'
              }
              rounded
              size="large"
              disabled={searching || !isReadyToSearch}
              onClickHandler={handleSearch}
              processing={searching}
              className={classes.buttonContinue}
            />
          ) : (
            <ButtonForward
              title="Confirm"
              rounded
              size="large"
              onClickHandler={handleConfirm}
              disabled={requestInProgress}
              processing={requestInProgress}
              className={classes.buttonContinue}
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
