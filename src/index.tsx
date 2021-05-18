import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Paper, CssBaseline } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import AOS from 'aos';

import { createFMCTheme, CustomTheme } from 'src/themes';
import Routes from './Routes';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './store';

import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'aos/dist/aos.css';

const browserHistory = createBrowserHistory();

browserHistory.listen((location: { action: string }) => {
  // Use setTimeout to make sure this runs after React Router's own listener
  setTimeout(() => {
    // Keep default behavior of restoring scroll position when user:
    // - clicked back button
    // - clicked on a link that programmatically calls `history.goBack()`
    // - manually changed the URL in the address bar (here we might want
    // to scroll to top, but we can't differentiate it from the others)
    if (location.action === 'POP') {
      return;
    }
    // In all other cases, scroll to top
    window.scrollTo(0, 0);
  });
});

const myTheme = createFMCTheme();
const App = () => {
  AOS.init({
    once: true,
    delay: 50,
    duration: 500,
    easing: 'ease-in-out',
  });

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MuiThemeProvider<CustomTheme> theme={myTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <SnackbarProvider maxSnack={3}>
              <CssBaseline />
              <Paper>
                <Router history={browserHistory}>
                  <Routes />
                </Router>
              </Paper>
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
