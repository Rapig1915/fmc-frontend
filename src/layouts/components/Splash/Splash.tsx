import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Image } from 'src/components/atoms';
import { IReduxState } from 'src/store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { URL } from 'src/utils/consts';
import { showSplash } from 'src/store/actions';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    padding: theme.spacing(5),
    maxWidth: 600,
  },
  title: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),

    fontFamily: 'Lato',
    fontSize: 23,
    lineHeight: '33px',
    textAlign: 'center',
    color: '#2A2D3C',
    fontWeight: 500,

    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },

    '& b': {
      fontWeight: 900,
    },
  },
  imageSplash: {
    objectFit: 'contain',
  },
  zipQuote: {
    marginTop: '30px',
  },
  image: {
    [theme.breakpoints.down('xs')]: {
      maxWidth: 500,
    },
  },
}));

const Splash = (): ReactElement => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();
  const history = useHistory();
  const stateShowSplash = useSelector<IReduxState, boolean>(
    (state: IReduxState) => state.quote.splash
  );
  const stateCustomer = useSelector<IReduxState, number>(
    (state: IReduxState) => state.quote.customer
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (stateShowSplash) {
        dispatch(showSplash(false));
        history.push(URL.QUOTE);
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [stateShowSplash, dispatch, history]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={stateShowSplash}
      // onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
    >
      <DialogContent className={classes.container}>
        <Image
          className={classes.imageSplash}
          src="/assets/splash.png"
          alt="certified"
          lazy={false}
        />
        <h3 className={classes.title}>
          <b>{stateCustomer} happy customers</b>
          <br />
          had their car fixed in your area with Fixmycar!
        </h3>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default Splash;
