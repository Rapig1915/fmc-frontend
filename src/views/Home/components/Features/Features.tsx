import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { BadgeFeature } from 'src/components/molecules';

interface FeaturesProps {
  className?: undefined;
}

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#2A2D3C',
    borderRadius: '15px',
  },
  title: {
    fontFamily: 'Artegra Sans',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '18px',
    lineHeight: '25px',
    color: '#FFFFFF',
    marginLeft: '10px',
  },
  img: {
    width: '40px',
    height: '40px',
    color: '#57FFC4',
  },
}));

const Features = (props: FeaturesProps): ReactElement => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid
        container
        justify="space-between"
        spacing={4}
        direction={isMd ? 'row' : 'column-reverse'}
      >
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={4}
          data-aos="fade-up"
        >
          <BadgeFeature
            title="Affordable"
            imgUrl="/assets/hand-money.svg"
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
          data-aos="fade-up"
        >
          <BadgeFeature
            title="Same day service"
            imgUrl="/assets/hand-mobile.svg"
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
          data-aos="fade-up"
        >
          <BadgeFeature
            title="Certified technicians"
            imgUrl="/assets/hand-car.svg"
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
