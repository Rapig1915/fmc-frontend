import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';

interface SelectWithStatusProps {
  items?: { [val: string]: string };
  label?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
  valueChanged?: (v: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  checked: {
    position: 'absolute',
    right: theme.spacing(3),
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
}));

/**
 * Component to display the icon
 *
 * @param SelectWithStatusProps props
 */
const SelectWithStatus = (props: SelectWithStatusProps): ReactElement => {
  const {
    label,
    className,
    valueChanged,
    defaultValue,
    items,
    disabled,
  } = props;

  const classes = useStyles();

  const [val, setVal] = React.useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const v = event.target.value as string;
    setVal(v);

    if (valueChanged) valueChanged(v);
  };

  return (
    <FormControl
      variant="outlined"
      className={clsx(classes.formControl, classes.root, className)}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        value={val && items && items[val] ? val : ''}
        onChange={handleChange}
        className={val ? classes.inputChecked : ''}
        disabled={disabled}
      >
        <MenuItem value="" key="item-empty">
          <em>-</em>
        </MenuItem>
        {items &&
          Object.keys(items).map((x) => (
            <MenuItem value={x} key={`item-${x}`}>
              {x}
            </MenuItem>
          ))}
      </Select>
      {!!val && <CheckCircle className={classes.checked} />}
    </FormControl>
  );
};

SelectWithStatus.defaultProps = {
  items: {},
  label: '',
  className: '',
  defaultValue: '',
  valueChanged: undefined,
  disabled: false,
};

export default SelectWithStatus;
