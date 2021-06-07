import React, { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { Grid, Hidden, makeStyles } from '@material-ui/core';
import { CustomTheme } from 'src/themes';
import { CheckStep } from 'src/components/molecules';
import { QuoteStep } from 'src/types';
import { ServiceIntro } from './components';

interface QuoteContainerProps {
  children?: ReactNode;
  className?: string;
  currentStep: QuoteStep;
  onStepChanged: (ns: QuoteStep) => void;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    '& h1': {
      margin: 0,
      color: theme.palette.common.white,
      fontFamily: 'Pacifico',
      fontSize: 25,
      fontWeight: 500,
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
    [theme.breakpoints.down('sm')]: {
      left: theme.spacing(2),
    },
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
    alignContent: 'center',
    justifyContent: 'center',
    position: 'relative',

    [theme.breakpoints.down('sm')]: {
      borderRadius: 9,
      minHeight: 500,
      padding: theme.spacing(2),
    },

    [theme.breakpoints.down('xs')]: {
      '&.congrats': {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        background: theme.palette.common.white,
        borderRadius: 0,
        zIndex: -1,
      },
    },
  },
  checkStep: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(4),
  },
}));

const QuoteContainer = (props: QuoteContainerProps): ReactElement => {
  const { children, className, currentStep, onStepChanged } = props;
  const classes = useStyles();

  const handleStepChange = (newStep: QuoteStep) => {
    onStepChanged(newStep);
  };

  return (
    <Grid container className={clsx(classes.root, className)}>
      <Hidden xsDown>
        <Grid container item sm={3}>
          <ServiceIntro />
        </Grid>
      </Hidden>
      <Hidden smUp>
        <Grid item xs={12}>
          <CheckStep
            currentStep={currentStep}
            onStepChanged={handleStepChange}
          />
        </Grid>
      </Hidden>
      <Grid
        container
        item
        sm={9}
        xs={12}
        className={clsx(
          classes.contentHolder,
          currentStep === QuoteStep.QUOTE_CONGRATS && 'congrats'
        )}
      >
        <Hidden xsDown>
          <CheckStep
            className={classes.checkStep}
            currentStep={currentStep}
            onStepChanged={handleStepChange}
          />
        </Hidden>
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
