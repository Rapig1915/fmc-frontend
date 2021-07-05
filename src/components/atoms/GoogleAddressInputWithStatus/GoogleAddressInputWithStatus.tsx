import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, FormControl } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { GOOGLE_API_KEY } from 'src/utils/config';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

interface GoogleAddressInputWithStatusProps {
  className?: string;
  value?: string;
  start?: React.ReactNode;
  valueChanged?: (v: string) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'flex-start',

    borderRadius: 5,
    border: '2px solid #D8D8D8',
    background: theme.palette.common?.white,
    padding: theme.spacing(1),
    paddingTop: 0,
    paddingBottom: 0,

    '&.input-checked': {
      border: '2px solid #36D9A0',
    },

    '& .google-places-autocomplete': {
      flexGrow: 1,
      height: '100%',
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),

      '& input': {
        fontFamily: 'Lato',
        fontWeight: 600,
        fontSize: 17,
        lineHeight: '21px',
        color: '#2A2D3C',
        width: '100%',
        border: 'none',
        outline: 'none',
      },
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  checked: {
    height: '100%',
    color: '#36D9A0',
    fontSize: 25,
    width: 30,
    maxHeight: 55,
  },
  start: {
    background: 'transparent',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    maxHeight: 55,
  },
  googlecontainer: {
    padding: 10,
  },
  googlesuggestion: {
    padding: 5,
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#e5e5e5',
    },
  },
}));

/**
 * Component to display the icon
 *
 * @param GoogleAddressInputWithStatusProps props
 */
const GoogleAddressInputWithStatus = (
  props: GoogleAddressInputWithStatusProps
): ReactElement => {
  const { className, valueChanged, value, start } = props;

  const classes = useStyles();

  const handleChange = (newAddr: string) => {
    if (valueChanged) valueChanged(newAddr);
  };

  const isCheck = !!value;

  return (
    <FormControl
      variant="outlined"
      className={clsx(
        classes.formControl,
        classes.root,
        className,
        start && 'with-start-icon',
        value && 'input-checked'
      )}
    >
      {start && <Box className={classes.start}>{start}</Box>}
      <GooglePlacesAutocomplete
        onSelect={(address) => handleChange(address.description)}
        apiKey={GOOGLE_API_KEY}
        initialValue={value}
        debounce={300}
        suggestionsClassNames={{
          container: classes.googlecontainer,
          suggestion: classes.googlesuggestion,
        }}
      />
      {!!isCheck && <CheckCircle className={classes.checked} />}
    </FormControl>
  );
};

GoogleAddressInputWithStatus.defaultProps = {
  className: '',
  value: '',
  valueChanged: undefined,
  start: undefined,
};

export default GoogleAddressInputWithStatus;
