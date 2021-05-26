import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { Grid, Hidden, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { CustomTheme } from 'src/themes';
import { Image } from 'src/components/atoms';
import { URL } from 'src/utils/consts';

interface QuoteContainerProps {
  children?: ReactNode;
  className?: string;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: 0,
      paddingTop: theme.spacing(1),
    },
  },
  intro: {
    background: '#493F82',
    padding: theme.spacing(4),
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    textAlign: 'center',
    position: 'relative',
    '& h1': {
      margin: 0,
      color: theme.palette.common.white,
      fontFamily: 'Pacifico Regular',
      fontSize: 25,
      marginLeft: theme.spacing(6),
      textAlign: 'left',
    },
    '& h3': {
      marginTop: theme.spacing(2),
      color: '#D5C3F2',
      fontFamily: 'Lato Regular',
      fontSize: 19,
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '27px',
      marginLeft: theme.spacing(6),
      textAlign: 'left',
    },
  },
  icon: {
    color: theme.palette.common.white,
    width: 40,
    height: 40,
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(4),
  },
  image: {
    objectFit: 'contain',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    height: 'auto',
  },
  linkTerm: {
    position: 'absolute',
    width: '100%',
    bottom: theme.spacing(4),
    left: 0,
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    color: '#D5C3F2',
  },

  contentHolder: {
    background: '#F4F7FC',
    minHeight: 750,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    padding: theme.spacing(4),
    alignContent: 'flex-start',

    [theme.breakpoints.down('sm')]: {
      borderRadius: 9,
    },
  },
}));

const QuoteContainer = (props: QuoteContainerProps): ReactElement => {
  const { children, className } = props;
  const classes = useStyles();

  return (
    <Grid container className={clsx(classes.root, className)}>
      <Hidden smDown>
        <Grid container item md={3} className={classes.intro}>
          <div>
            <InfoIcon fontSize="large" className={classes.icon} />
            <h1>Did you know?</h1>
            <h3>
              Changing your oil every 3,000 miles will help your car last to a
              ripe old age!
            </h3>
            <Image
              className={classes.image}
              src="/assets/quote-intro.png"
              alt="quote"
              lazy={false}
            />
            <a href={URL.DASHBOARD} className={classes.linkTerm}>
              Terms & Conditions
            </a>
          </div>
        </Grid>
      </Hidden>
      <Grid
        container
        item
        md={9}
        sm={12}
        xs={12}
        className={classes.contentHolder}
      >
        {children}
      </Grid>
    </Grid>
  );
};

QuoteContainer.defaultProps = {
  children: undefined,
  className: undefined,
};

export default QuoteContainer;