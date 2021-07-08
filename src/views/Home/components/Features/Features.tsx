import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { ImageNode } from 'src/components/molecules';

import SvgHandMoney from 'src/assets/badges/hand-money.svg';
import SvgHandMobile from 'src/assets/badges/hand-mobile.svg';
import SvgHandCar from 'src/assets/badges/hand-car.svg';

interface FeaturesProps {
  className?: undefined;
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#2A2D3C',
    borderRadius: '15px',
  },
  title: {
    fontFamily: 'Alegreya Sans',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '18px',
    lineHeight: '25px',
    color: '#FFFFFF',
    marginLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '200px',
    },
  },
  img: {
    width: '40px',
    height: '40px',
    color: '#57FFC4',
  },
  fullBackground: {
    background: '#2A2D3C',
  },
}));

const Features = (props: FeaturesProps): ReactElement => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const isXs = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

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
          className={!isXs ? classes.fullBackground : ''}
          // data-aos="fade-up"
        >
          <ImageNode
            title="Affordable"
            imgUrl={SvgHandMoney}
            titleProps={{ className: classes.title }}
            imgProps={{ className: classes.img }}
          />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={4}
          className={!isXs ? classes.fullBackground : ''}
          // data-aos="fade-up"
        >
          <ImageNode
            title="Same day service"
            imgUrl={SvgHandMobile}
            titleProps={{ className: classes.title }}
            imgProps={{ className: classes.img }}
          />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={4}
          className={!isXs ? classes.fullBackground : ''}
          // data-aos="fade-up"
        >
          <ImageNode
            title="Certified technicians"
            imgUrl={SvgHandCar}
            titleProps={{ className: classes.title }}
            imgProps={{ className: classes.img }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

Features.defaultProps = {
  className: undefined,
};

export default Features;
