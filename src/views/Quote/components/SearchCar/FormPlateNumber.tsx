import React, { ReactElement, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { stateList } from 'src/utils/data';
import { InputWithStatus, SelectWithStatus } from 'src/components/atoms';
import { QuoteContext } from '../../QuoteContext';

interface FormPlateNumberProps {
  className?: string;
  show: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: (props: FormPlateNumberProps) => (props.show ? 'flex' : 'none'),
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
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
}));

const FormPlateNumber = (props: FormPlateNumberProps): ReactElement => {
  const { className, show } = props;

  const classes = useStyles({ show });

  const optionStates = stateList.reduce((obj, x) => {
    return {
      ...obj,
      [x]: x,
    };
  }, {});

  const { car, handleSetCar } = useContext(QuoteContext);

  const handleChangePlateNumber = (val: string) => {
    handleSetCar({
      ...car,
      search: {
        ...car.search,
        plate_number: val,
      },
    });
  };

  const handleChangeState = (val: string) => {
    handleSetCar({
      ...car,
      search: {
        ...car.search,
        state: val,
      },
    });
  };

  return (
    <Box
      className={clsx(
        'quote-search-car-form-plate-number',
        classes.root,
        className
      )}
    >
      <InputWithStatus
        placeholder="Plate number"
        value={car.search.plate_number}
        valueChanged={handleChangePlateNumber}
      />
      <SelectWithStatus
        items={optionStates}
        label="State"
        value={car.search.state}
        valueChanged={handleChangeState}
      />
    </Box>
  );
};

FormPlateNumber.defaultProps = {
  className: undefined,
};

export default FormPlateNumber;
