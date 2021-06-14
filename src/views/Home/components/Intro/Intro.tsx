import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { Image } from 'src/components/atoms';
import { SectionHeader, ZipcodeQuote } from 'src/components/molecules';

import SvgCertified from 'src/assets/badges/certified.svg';
import ImageIntroBackground from 'src/assets/intro-background.png';

interface IntroProps {
  className?: undefined;
  onGetQuote?: (payload: { zip?: string; customer?: number }) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  introTitle: {
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 600,
    letterSpacing: '2px',
    color: '#24CF93',
    padding: 0,
  },
  introSubtitle: {
    fontFamily: 'Lato',
    fontSize: '65px',
    fontStyle: 'normal',
    fontWeight: 900,
    lineHeight: '60px',
    letterSpacing: '0px',
    color: '#2A2D3C',
  },
  certifiedImage: {
    width: '20px',
    height: '100%',
    objectFit: 'contain',
    color: '##36D9A0',
    marginRight: '10px',
  },
  zipQuote: {
    marginTop: '30px',
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: 500,
    },
  },
}));

const Intro = (props: IntroProps): ReactElement => {
  const { className, onGetQuote, ...rest } = props;
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
          md={6}
          // data-aos="fade-up"
        >
          <SectionHeader
            title={
              <>
                <Image
                  className={classes.certifiedImage}
                  src={SvgCertified}
                  alt="certified"
                  lazy={false}
                />
                <span>CERTIFIED MOBILE</span>
              </>
            }
            subtitle={
              <span>
                Mechanics
                <br /> come to you
              </span>
            }
            ctaGroup={[
              <ZipcodeQuote
                className={classes.zipQuote}
                onGetQuote={onGetQuote}
              />,
            ]}
            align={isMd ? 'left' : 'center'}
            disableGutter
            titleVariant="h6"
            titleProps={{
              className: classes.introTitle,
            }}
            subtitleVariant="h3"
            subtitleProps={{
              className: classes.introSubtitle,
            }}
          />
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          md={6}
          // data-aos="fade-up"
        >
          <Image
            src={ImageIntroBackground}
            alt="TheFront Company"
            className={classes.image}
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
        </Grid>
      </Grid>
    </div>
  );
};

Intro.defaultProps = {
  className: undefined,
  onGetQuote: undefined,
};

export default Intro;
