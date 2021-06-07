import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { InputWithStatus, SelectWithStatus } from 'src/components/atoms';
import { getVehicles } from 'src/api/quote';
import { ItemVehicle } from 'src/types';

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

  const optionYear = Array(50)
    .fill(0)
    .reduce((obj, x, index) => {
      return {
        ...obj,
        [2021 - index]: 2021 - index,
      };
    }, {});

  const [vehicleList, setVehicleList] = useState<[ItemVehicle]>();

  React.useEffect(() => {
    setTimeout(async () => {
      const resp = await getVehicles('', '', '');
      if (resp && resp.data) setVehicleList(resp.data);
    });
  }, []);

  const [inputData, setInputData] = useState({
    year: '',
    brand: '',
    model: '',
    engine: '',
    mileage: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setInputData((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const allBrands =
    (vehicleList &&
      vehicleList.reduce((obj, x) => {
        return inputData.year === x.attributes.year
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
        return inputData.year === x.attributes.year &&
          inputData.brand === x.attributes.make
          ? {
              ...obj,
              [x.attributes.model]: x.attributes.model,
            }
          : obj;
      }, {})) ||
    {};

  const allMotors =
    (vehicleList &&
      vehicleList.reduce((obj, x) => {
        return inputData.year === x.attributes.year &&
          inputData.brand === x.attributes.make &&
          inputData.model === x.attributes.model
          ? {
              ...obj,
              [x.attributes.engine_size]: x.attributes.engine_size,
            }
          : obj;
      }, {})) ||
    {};

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
          defaultValue={inputData.year}
          valueChanged={(val: string) => handleInputChange('year', val)}
        />
        <SelectWithStatus
          key="select-brand"
          className={classes.flexGrow}
          label="Brand"
          items={allBrands}
          defaultValue={inputData.brand}
          valueChanged={(val: string) => handleInputChange('brand', val)}
        />
      </Box>
      <SelectWithStatus
        key="select-model"
        label="Model"
        items={allModels}
        defaultValue={inputData.model}
        valueChanged={(val: string) => handleInputChange('model', val)}
      />
      <SelectWithStatus
        key="select-engine"
        label="Engine"
        items={allMotors}
        defaultValue={inputData.engine}
        valueChanged={(val: string) => handleInputChange('engine', val)}
      />
      <InputWithStatus
        key="input-mileage"
        placeholder="Mileage"
        defaultValue={inputData.mileage}
        valueChanged={(val) => handleInputChange('mileage', val)}
      />
    </Box>
  );
};

FormYearMakeModel.defaultProps = {
  className: undefined,
};

export default FormYearMakeModel;
