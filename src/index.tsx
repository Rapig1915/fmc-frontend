import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import reportWebVitals from './reportWebVitals';
import Pages from './pages';
import { persistor, store } from './store';
import theme from './themes/default';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <SnackbarProvider maxSnack={3}>
              <CssBaseline />
              <Pages />
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
