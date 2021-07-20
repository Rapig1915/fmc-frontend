import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { DatePicker } from '@material-ui/pickers';

interface DatePickerProps {
  date: MaterialUiPickersDate;
  shouldDisableDate: (day: MaterialUiPickersDate) => boolean;
  onChangeDate: (newDate: MaterialUiPickersDate) => void;
}

const useStyles = makeStyles((theme) => ({
  myPicker: {
    [theme.breakpoints.down('xs')]: {
      minWidth: 200,

      '& .MuiPickersBasePicker-pickerView': {
        minWidth: 200,
      },
    },
  },
}));

export default function MDatePicker(props: DatePickerProps): ReactElement {
  const { shouldDisableDate, onChangeDate, date } = props;

  const classes = useStyles();

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });

  return (
    <DatePicker
      orientation={isSm ? 'portrait' : 'landscape'}
      variant="static"
      openTo="date"
      value={date}
      disableToolbar
      shouldDisableDate={shouldDisableDate}
      onChange={onChangeDate}
      className={classes.myPicker}
    />
  );
}

MDatePicker.defaultProps = {};
