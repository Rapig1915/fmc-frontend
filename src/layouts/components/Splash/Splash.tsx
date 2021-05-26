import React, { ReactElement } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Image } from 'src/components/atoms';

interface SplashProps {
  show: boolean;
}

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    padding: theme.spacing(5),
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

const Splash = (props: SplashProps): ReactElement => {
  const { show } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  // const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   //   setOpen(false);
  // };

  const cntHappyCustomers = 245;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={show}
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
          <b>{cntHappyCustomers} happy customers</b>
          <br />
          had their car fixed in your area with Fixmycar!
        </h3>
        <CircularProgress />
      </DialogContent>
      {/* <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};

Splash.defaultProps = {};

export default Splash;
