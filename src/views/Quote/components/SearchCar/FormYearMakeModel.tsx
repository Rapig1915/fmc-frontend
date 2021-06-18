import React, { ReactElement, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { SelectWithStatus } from 'src/components/atoms';
import { getVehicles } from 'src/api/quote';
import { IVehicle } from 'src/types';
import { allMileage } from 'src/utils/data';
import { QuoteContext } from '../../QuoteContext';

interface FormYearMakeModelProps {
  className?: string;
  show: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: (props: FormYearMakeModelProps) => (props.show ? 'flex' : 'none'),
    flexDirection: 'column',
  },
  title: {
    fontSize: 23,
    lineHeight: '28px',
    fontWeight: 800,
    marginBottom: theme.spacing(3),
  },

  yearContainer: {
    display: 'flex',
    flexDirection: 'row',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
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

const FormYearMakeModel = (props: FormYearMakeModelProps): ReactElement => {
  const { className, show } = props;

  const classes = useStyles({ show });

  const optionYear = Array(32)
    .fill(0)
    .reduce((obj, x, index) => {
      return {
        ...obj,
        [2021 - index]: 2021 - index,
      };
    }, {});

  const { car, handleSetCar } = useContext(QuoteContext);

  const [vehicleList, setVehicleList] = useState<[IVehicle]>();

  React.useEffect(() => {
    setTimeout(async () => {
      const resp = await getVehicles(car.attributes.year, '', '');
      if (resp && resp.data) setVehicleList(resp.data);
    });
  }, [car.attributes.year]);

  const handleInputChange = _.debounce((key: string, value: string) => {
    let removeFields = {};

    if (key === 'year') removeFields = { make: '', model: '', engine_size: '' };
    else if (key === 'make') removeFields = { model: '', engine_size: '' };
    else if (key === 'model') removeFields = { engine_size: '' };

    handleSetCar({
      ...car,
      attributes: {
        ...car.attributes,
        ...removeFields,
        [key]: value,
      },
    });
  }, 200);

  const allMakes =
    (vehicleList &&
      vehicleList.reduce((obj, x) => {
        return car.attributes.year === x.attributes.year
          ? {
              ...obj,
              [x.attributes.make]: x.attributes.make,
            }
          : obj;
      }, {})) ||
    {};

  const allModels =
    (vehicleList &&
      vehicleList.reduce((obj, x) => {
        return car.attributes.year === x.attributes.year &&
          car.attributes.make === x.attributes.make
          ? {
              ...obj,
              [x.attributes.model]: x.attributes.model,
            }
          : obj;
      }, {})) ||
    {};

  const allMotors = React.useMemo(
    () =>
      (vehicleList &&
        vehicleList.reduce((obj, x) => {
          return car.attributes.year === x.attributes.year &&
            car.attributes.make === x.attributes.make &&
            car.attributes.model === x.attributes.model
            ? {
                ...obj,
                [x.attributes.engine_size]: x.attributes.engine_size,
              }
            : obj;
        }, {})) ||
      {},
    [car, vehicleList]
  );

  const allMileages =
    (allMileage &&
      allMileage.reduce((obj, x) => {
        return {
          ...obj,
          [x]: x,
        };
      }, {})) ||
    {};

  useEffect(() => {
    if (Object.keys(allMotors).length === 1 && !car.attributes.engine_size) {
      handleInputChange('engine_size', Object.keys(allMotors)[0]);
    }
  }, [allMotors, handleInputChange, car]);

  return (
    <Box
      className={clsx(
        'quote-search-car-form-year-make-model',
        classes.root,
        className
      )}
    >
      <Box className={classes.yearContainer}>
        <SelectWithStatus
          key="select-year"
          label="Year"
          items={optionYear}
          value={car.attributes.year}
          valueChanged={(val: string) => handleInputChange('year', val)}
        />
        <SelectWithStatus
          key="select-make"
          className={classes.flexGrow}
          label="Make"
          items={allMakes}
          value={car.attributes.make}
          valueChanged={(val: string) => handleInputChange('make', val)}
        />
      </Box>
      <SelectWithStatus
        key="select-model"
        label="Model"
        items={allModels}
        value={car.attributes.model}
        valueChanged={(val: string) => handleInputChange('model', val)}
      />
      <SelectWithStatus
        key="select-engine"
        label="Engine"
        items={allMotors}
        value={car.attributes.engine_size}
        valueChanged={(val: string) => handleInputChange('engine_size', val)}
        extraOptions={{ "I don't know": "I don't know" }}
      />
      <SelectWithStatus
        key="select-mileage"
        label="Mileage"
        items={allMileages}
        value={car.attributes.mileage}
        valueChanged={(val) => handleInputChange('mileage', val)}
        extraOptions={{ "I don't know": "I don't know" }}
      />
    </Box>
  );
};

FormYearMakeModel.defaultProps = {
  className: undefined,
};

export default FormYearMakeModel;
