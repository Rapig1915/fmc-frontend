import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

export default responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#6D59F9',
      },
      secondary: {
        main: '#66D5A2',
      },
    },
    props: {
      MuiTextField: {
        variant: 'outlined',
      },
    },
  })
);
