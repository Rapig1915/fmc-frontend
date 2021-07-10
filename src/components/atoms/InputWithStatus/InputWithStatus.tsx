import React, { ChangeEvent, ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl, TextField } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';

interface InputWithStatusProps {
  placeholder?: string;
  className?: string;
  value?: string;
  multiline?: boolean;
  start?: React.ReactNode;
  valueChanged?: (v: string) => void;
  disabled?: boolean;
  password?: boolean;
  email?: boolean;
  forceLength?: number;
  minLength?: number;
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
    value,
    placeholder,
    start,
    disabled,
    password,
    multiline,
    email,
    forceLength,
    minLength,
  } = props;

  const classes = useStyles();

  const handleChange = (evt: ChangeEvent<{ value: string }>) => {
    const v = evt.target.value as string;
    if (valueChanged) valueChanged(v);
  };

  const validateEmail = (em: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(em).toLowerCase());
  };

  const isCheck =
    !!value &&
    (!email || validateEmail(value)) &&
    (!forceLength || value.length === forceLength) &&
    (!minLength || value.length >= minLength);

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
        type={password ? 'password' : 'text'}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={value ? classes.inputChecked : ''}
        disabled={disabled}
        multiline={multiline}
      />
      {start && <Box className={classes.start}>{start}</Box>}
      {!!isCheck && <CheckCircle className={classes.checked} />}
    </FormControl>
  );
};

InputWithStatus.defaultProps = {
  className: '',
  value: '',
  valueChanged: undefined,
  placeholder: '',
  start: undefined,
  disabled: false,
  multiline: false,
  password: false,
  forceLength: 0,
  minLength: 0,
  email: false,
};

export default InputWithStatus;
