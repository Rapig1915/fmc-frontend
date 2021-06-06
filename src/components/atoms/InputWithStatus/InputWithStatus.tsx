import React, { ChangeEvent, ReactElement, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, TextField } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';

interface InputWithStatusProps {
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  multiline?: boolean;
  start?: React.ReactNode;
  valueChanged?: (v: string) => void;
  disabled?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  checked: {
    position: 'absolute',
    top: 0,
    right: theme.spacing(1),
    height: '100%',
    color: '#36D9A0',
    fontSize: 25,
    width: 30,
  },
  inputChecked: {
    '& .MuiInputBase-input': {
      border: '2px solid #36D9A0',
    },
  },
  start: {
    position: 'absolute',
    background: 'transparent',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
}));

/**
 * Component to display the icon
 *
 * @param InputWithStatusProps props
 */
const InputWithStatus = (props: InputWithStatusProps): ReactElement => {
  const {
    className,
    valueChanged,
    defaultValue,
    placeholder,
    start,
    disabled,
    multiline,
  } = props;

  const [val, setVal] = useState(defaultValue);

  const classes = useStyles();

  const handleChange = (evt: ChangeEvent<{ value: unknown }>) => {
    const v = evt.target.value as string;
    setVal(v);

    if (valueChanged) valueChanged(v);
  };

  return (
    <FormControl
      variant="outlined"
      className={clsx(
        classes.formControl,
        classes.root,
        className,
        start && 'with-start-icon'
      )}
    >
      <TextField
        autoComplete="off"
        value={val}
        placeholder={placeholder}
        onChange={handleChange}
        className={val ? classes.inputChecked : ''}
        disabled={disabled}
        multiline={multiline}
      />
      {start && <Box className={classes.start}>{start}</Box>}
      {!!val && <CheckCircle className={classes.checked} />}
    </FormControl>
  );
};

InputWithStatus.defaultProps = {
  className: '',
  defaultValue: '',
  valueChanged: undefined,
  placeholder: '',
  start: undefined,
  disabled: false,
  multiline: false,
};

export default InputWithStatus;
