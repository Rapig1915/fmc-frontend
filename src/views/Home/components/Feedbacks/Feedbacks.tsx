import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Button } from '@material-ui/core';
import { DriveEta, Star } from '@material-ui/icons';
import { Image, ButtonGetQuote } from 'src/components/atoms';
import {
  ImageNode,
  SectionHeader,
  ZipcodeQuote,
} from 'src/components/molecules';

interface FeedbacksProps {
  className?: undefined;
}

const useStyles = makeStyles((theme) => ({
  root: {},

  withShadow: {
    boxShadow: `0 2px 10px 0 rgba(23, 70, 161, .11)`,
  },
  noShadow: {
    boxShadow: 'none',
  },
  liftUp: {
    transition:
      'box-shadow .25s ease,transform .25s ease,-webkit-transform .25s ease',
    '&:hover': {
      boxShadow:
        '0 1.5rem 2.5rem rgba(22,28,45,.1),0 .3rem 0.5rem -.50rem rgba(22,28,45,.05) !important',
      transform: 'translate3d(0,-5px,0)',
    },
  },
  liftedUp: {
    boxShadow:
      '0 1.5rem 2.5rem rgba(22,28,45,.1),0 .3rem 0.5rem -.50rem rgba(22,28,45,.05) !important',
    transform: 'translate3d(0,-5px,0)',
  },

  containerFlexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  containerFlexRow: {
    display: 'flex',
    flexDirection: 'row',
  },

  badgeCustomer: {
    cursor: 'pointer',
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'flex-start',
  },
  nameCustomer: {
    fontFamily: 'Artegra Sans',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '27.63px',
    color: '#000000',
  },
  imgCustomer: {
    width: '50px',
    height: '50px',
    marginRight: '20px',
    borderRadius: '100%',
  },

  containerFeedbackHeader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    '& h1': {
      fontFamily: 'Lato',
      fontStyle: 'normal',
      fontWeight: 900,
      fontSize: '30px',
      lineHeight: '40px',
      color: '#2A2D3C',
      marginTop: '10px',
      marginBottom: '5px',
    },
  },
  starFeedback: {
    color: '#FFB800',
  },
  buttonFeedbackCar: {
    height: '43px',
    width: '188px',
    background: '#79739C',
    borderRadius: '7px',
    color: '#FFFFFF',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: '14px',
    lineHeight: '16.8px',
  },
  imgFeedbackBack: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  textFeedback: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '29px',
    color: '#79739C',
  },
  buttonGetQuote: {
    width: '200px',
  },
}));

const Feedbacks = (props: FeedbacksProps): ReactElement => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const itemsCustomer = [
    {
      img: 'customers/mariah.png',
      name: 'Mariah Heighl',
    },
    {
      img: 'customers/johnny.png',
      name: 'Johnny Riece',
    },
    {
      img: 'customers/marian.png',
      name: 'Marian Huves',
    },
    {
      img: 'customers/alice.png',
      name: 'Alice Bleu',
    },
  ];

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid
        container
        justify="space-between"
        spacing={4}
        direction={isMd ? 'row' : 'column'}
      >
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={4}
          lg={3}
          // data-aos="fade-up"
          className={classes.containerFlexColumn}
        >
          {itemsCustomer &&
            itemsCustomer.map((x, index) => (
              <ImageNode
                title={<span>{x.name}</span>}
                imgUrl={`/assets/${x.img}`}
                titleProps={{ className: classes.nameCustomer }}
                imgProps={{ className: classes.imgCustomer }}
                className={clsx(
                  classes.badgeCustomer,
                  classes.liftUp,
                  !index && classes.liftedUp
                )}
              />
            ))}
        </Grid>
        <Grid
          item
          container
          justify="flex-start"
          // alignItems="center"
          xs={12}
          md={8}
          lg={9}
          data-aos="fade-up"
        >
          <div className={classes.containerFeedbackHeader}>
            <div className={classes.containerFlexColumn}>
              <h1>Loved the experience</h1>
              <div className={classes.containerFlexRow}>
                {[0, 1, 2, 3, 4].map((x) => (
                  <Star key={x} className={classes.starFeedback} />
                ))}
              </div>
            </div>
            <Button
              color="inherit"
              startIcon={<DriveEta />}
              className={classes.buttonFeedbackCar}
            >
              Nissan Sentra
            </Button>
          </div>
          <Image
            className={classes.imgFeedbackBack}
            src="/assets/feedback-back.png"
            lazy
          />
          <p className={classes.textFeedback}>
            We believe in honesty & transparency, our 5 star expert mobile
            mechanic Ralph fixed the issue within 10 mins and only charged the
            min fee. Save your dollars for something more useful than car
            repair!
          </p>
          <ButtonGetQuote
            rounded
            size="large"
            className={classes.buttonGetQuote}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Feedbacks.defaultProps = {
  className: undefined,
};

export default Feedbacks;
