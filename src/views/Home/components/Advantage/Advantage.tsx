import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography } from '@material-ui/core';
import { Image, ButtonGetQuote } from 'src/components/atoms';
import {
  SectionHeader,
  ZipcodeQuote,
  ImageNode,
} from 'src/components/molecules';
import { url } from 'inspector';
import { CustomTheme } from 'src/themes';

interface AdvantageProps {
  className?: undefined;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {},
  flexGrow: {
    flexGrow: 1,
  },
  offsetLeft: {
    marginLeft: '-20px',
  },

  containerAdvantage: {
    background: `url(/assets/advantage-back.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '568px',
    height: '745px',
    padding: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  containerShop: {
    background: `url(/assets/advantage-shop-back.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '500px',
    height: '600px',
    padding: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
    zIndex: 99,
  },

  logoImage: {
    width: '100%',
    height: '50px',
    paddingRight: '60%',
    marginBottom: '20px',
    objectFit: 'contain',
  },

  badgeAdvantage: {
    alignItems: 'flex-start',
  },
  titleAdvantage: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: '22px',
    lineHeight: '40px',
    color: '#FFFFFF',
    '& p': {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '29px',
      color: '#D5C3F2',
    },
  },
  imgAdvantage: {
    width: '36px',
    height: '38px',
    marginRight: '20px',
    color: '#FFFFFF',
  },

  badgeShop: {
    alignItems: 'flex-start',
  },
  titleShop: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: '22px',
    lineHeight: '40px',
    color: '#79739C',
    '& p': {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: '29px',
      color: '#79739C',
    },
  },
  imgShop: {
    width: '36px',
    height: '38px',
    marginRight: '20px',
    color: '#FFFFFF',
  },

  buttonQuote: {
    minWidth: '250px',
    height: '50px',
    borderRadius: '31px',
    color: '#0000FF',
    backgroundColor: theme.palette.common.white,
  },

  labelShop: {
    width: '100%',
    height: '50px',
    paddingRight: '60%',
    marginBottom: '20px',
    fontFamily: 'Lato',
    fontWeight: 900,
    fontStyle: 'normal',
    fontSize: '25px',
    lineHeight: '40px',
    color: theme.palette.common.black,
  },
}));

const Advantage = (props: AdvantageProps): ReactElement => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const itemsAdvantage = [
    {
      img: 'badges/advantage-money.svg',
      title: 'Affordable & honest',
      subtitle:
        "Fixed & upfront pricing. No hidden fees and you'll get the lowest prices guaranteed.",
    },
    {
      img: 'badges/advantage-ring.svg',
      title: "We'll come to you",
      subtitle:
        'Friendly, car mechanics will come to your home, office or parking lot.',
    },
    {
      img: 'badges/advantage-time.svg',
      title: 'Flexible hours',
      subtitle:
        'Open every-day from 9am - 9pm. Book our epxerienced certified technicians today.',
    },
  ];

  const itemsShop = [
    {
      img: 'badges/advantage-shop-money.svg',
      title: 'Expensive & devius',
      subtitle: '30% more expensive and come with additional fees & upsells.',
    },
    {
      img: 'badges/advantage-shop-location.svg',
      title: 'Inconvinient service locations',
      subtitle: 'Repairs must be done at a physical auto repair shop.',
    },
    {
      img: 'badges/advantage-shop-rigid.svg',
      title: 'Rigid hours',
      subtitle: 'Open limited hours and at times closed on weekends.',
    },
  ];

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid
        container
        justify="center"
        spacing={0}
        direction={isMd ? 'row' : 'column'}
      >
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={6}
          // data-aos="fade-up"
          className={classes.containerAdvantage}
        >
          <Image
            className={classes.logoImage}
            src="/assets/logo-white.svg"
            alt="certified"
            lazy={false}
          />
          {itemsAdvantage &&
            itemsAdvantage.map((x) => (
              <ImageNode
                title={
                  <>
                    <span>{x.title}</span>
                    <p>{x.subtitle}</p>
                  </>
                }
                imgUrl={`/assets/${x.img}`}
                titleProps={{ className: classes.titleAdvantage }}
                imgProps={{ className: classes.imgAdvantage }}
                className={classes.badgeAdvantage}
              />
            ))}
          <ButtonGetQuote
            size="large"
            color="default"
            className={classes.buttonQuote}
          />
        </Grid>
        <Grid
          item
          container
          justify="flex-start"
          alignItems="center"
          xs={12}
          md={6}
          // data-aos="fade-up"
          className={clsx(
            classes.containerShop,
            isMd ? classes.offsetLeft : ''
          )}
        >
          <Typography className={classes.labelShop}>Repair Shop</Typography>
          {itemsShop &&
            itemsShop.map((x) => (
              <ImageNode
                title={
                  <>
                    <span>{x.title}</span>
                    <p>{x.subtitle}</p>
                  </>
                }
                imgUrl={`/assets/${x.img}`}
                titleProps={{ className: classes.titleShop }}
                imgProps={{ className: classes.imgShop }}
                className={classes.badgeShop}
              />
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

Advantage.defaultProps = {
  className: undefined,
};

export default Advantage;
