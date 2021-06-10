import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Typography, Hidden } from '@material-ui/core';
import { Image, ButtonForward } from 'src/components/atoms';
import { ImageNode, TabSelector } from 'src/components/molecules';
import { CustomTheme } from 'src/themes';
import {
  advantageCompareList,
  itemsAdvantage,
  itemsShop,
} from 'src/utils/data';
import logger from 'src/utils/logger';

import SvgLogoWhite from 'src/assets/logo-white.svg';

interface AdvantageProps {
  className?: undefined;
  onGetQuote?: (payload: { zip?: string; customer?: number }) => void;
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
    padding: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      padding: '20px',
    },
  },
  containerAdvantageMask1: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    background: '#4A37B1',
    borderRadius: '23px',
    zIndex: -1,
  },
  containerAdvantageMask2: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    background: '#57FFC4',
    borderRadius: '23px',
    transform: 'rotate(-3deg)',
    zIndex: -2,
  },

  containerShop: {
    padding: '50px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px',
    marginBottom: '50px',
    zIndex: 99,
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      padding: '20px',
    },
  },
  containerShopMask: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    background: '#F3ECFF',
    borderRadius: '23px',
    zIndex: -2,
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
    justifyContent: 'flex-start',
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
    justifyContent: 'flex-start',
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

  ButtonForward: {
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
  const { className, onGetQuote, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const onTabSelected = (key: string) => {
    logger.log(key);
  };

  const handleForward = () => {
    if (onGetQuote) onGetQuote({});
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Hidden mdUp>
        <TabSelector
          items={advantageCompareList}
          onTabSelected={onTabSelected}
          selectedValue={Object.keys(advantageCompareList)[0]}
        />
      </Hidden>
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
          <div
            className={classes.containerAdvantageMask1}
            key="advantage-mask1"
          />
          <div
            className={classes.containerAdvantageMask2}
            key="advantage-mask2"
          />
          <Image
            className={classes.logoImage}
            src={SvgLogoWhite}
            alt="certified"
            lazy={false}
          />
          {itemsAdvantage &&
            itemsAdvantage.map((x) => (
              <ImageNode
                key={x.title}
                title={
                  <>
                    <span>{x.title}</span>
                    <p>{x.subtitle}</p>
                  </>
                }
                imgUrl={x.img}
                titleProps={{ className: classes.titleAdvantage }}
                imgProps={{ className: classes.imgAdvantage }}
                className={classes.badgeAdvantage}
              />
            ))}
          <ButtonForward
            size="large"
            color="default"
            className={classes.ButtonForward}
            onClickHandler={handleForward}
          />
        </Grid>
        <Hidden smDown>
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
            <div className={classes.containerShopMask} key="shop-mask" />
            <Typography className={classes.labelShop}>Repair Shop</Typography>
            {itemsShop &&
              itemsShop.map((x) => (
                <ImageNode
                  key={x.title}
                  title={
                    <>
                      <span>{x.title}</span>
                      <p>{x.subtitle}</p>
                    </>
                  }
                  imgUrl={x.img}
                  titleProps={{ className: classes.titleShop }}
                  imgProps={{ className: classes.imgShop }}
                  className={classes.badgeShop}
                />
              ))}
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

Advantage.defaultProps = {
  className: undefined,
  onGetQuote: undefined,
};

export default Advantage;
