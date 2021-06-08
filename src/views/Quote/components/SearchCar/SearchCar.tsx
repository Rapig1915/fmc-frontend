import React, { ReactElement, useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Hidden, Typography } from '@material-ui/core';
import { TabSelector } from 'src/components/molecules';
import ButtonForward from 'src/components/atoms/ButtonForward';
import { Image } from 'src/components/atoms';
import { arrCarSelectTypes } from 'src/utils/data';
import { ICarMeta, CarSelectType, QuoteShowModal } from 'src/types';
import { checkPlateNumber } from 'src/api/quote';
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

    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },

    '& .button-mobile-info': {
      width: 45,
      height: 45,
    },
  },
}));

const SearchCar = (props: SearchCarProps): ReactElement => {
  const { className, onConfirm } = props;

  const classes = useStyles();

  const [carSelectType, setCarSelectType] = useState(
    Object.keys(arrCarSelectTypes)[0]
  );

  const { car, handleSetCar } = useContext(QuoteContext);

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
    if (key === CarSelectType.BY_PLATE_NUMBER)
      handleSetCar({
        ...car,
        attributes: {
          year: '',
          make: '',
          model: '',
          engine_size: '',
          mileage: '',
        },
      });
  };

  const handleSearch = async () => {
    if (carSelectType === CarSelectType.BY_PLATE_NUMBER) {
      if (!car.search.plate_number || !car.search.state) return;

      const resp = await checkPlateNumber(
        car.search.plate_number,
        car.search.state
      );

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
        },
      });

      setIsReadyToConfirm(true);
    } else {
      if (
        !car.attributes.year ||
        !car.attributes.make ||
        !car.attributes.model ||
        !car.attributes.engine_size
      )
        return;

      setIsReadyToConfirm(true);
    }
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
  };

  const { handleShowModal } = useContext(QuoteContext);
  const handleShowIntro = () => {
    handleShowModal(QuoteShowModal.SERVICE_INTRO);
  };

  return (
    <Box className={clsx('quote-search-car', classes.root, className)}>
      <Typography className={classes.title}>Tell us about your car?</Typography>
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
            show={
              !isReadyToConfirm &&
              carSelectType === CarSelectType.BY_YEAR_MAKE_MODEL
            }
          />
          <FormConfirmCar show={isReadyToConfirm} />
        </Grid>
        <Grid item md={4} sm={12} xs={12} className={classes.actionContainer}>
          <Hidden smUp>
            <Box onClick={handleShowIntro}>
              <Image
                src="/assets/menu/toggle-information.svg"
                lazy={false}
                className="button-mobile-info"
              />
            </Box>
          </Hidden>
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
