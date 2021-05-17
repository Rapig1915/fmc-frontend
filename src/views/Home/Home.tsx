import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { colors, Hidden, useMediaQuery, useTheme } from '@material-ui/core';
import { Section } from 'src/components/organisms';

import { CustomTheme } from 'src/themes';
import { Image, ButtonGetQuote } from 'src/components/atoms';
import { ImageNode } from 'src/components/molecules';
import {
  Intro,
  Advantage,
  Features,
  FollowUp,
  WorkSteps,
  Feedbacks,
  Candidates,
  Location,
} from './components';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  positionRelative: {
    position: 'relative',
    zIndex: 10,
  },
  alignCenter: {
    textAlign: 'center',
  },
  pagePaddingTop: {
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
    },
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  shape: {
    background: theme.palette.background.default,
    borderBottomRightRadius: '50%',
    borderBottom: `1px solid ${colors.grey[200]}`,
  },
  imgLove: {
    width: '30px',
    height: '30px',
    objectFit: 'contain',
    color: '#FF0072',
    marginRight: '10px',
    marginLeft: '10px',
  },
  imgWorkStepLogo: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
  },
  buttonGetQuote: {
    marginTop: '-50px',
    width: '250px',
    height: '50px',
  },

  containerWarranty: {
    background: '#4A37B1',
    borderRadius: '7px',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  imgWarranty: {
    width: '30px',
    height: '30px',
    margin: '5px',
    objectFit: 'contain',
    color: '#57FFC4',
    marginRight: '10px',
  },
  titleWarranty: {
    color: theme.palette.common.white,
    fontFamily: 'Artegra Sans',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '23px',
    lineHeight: '32px',
  },
}));

const Home = (): ReactElement => {
  const classes = useStyles();

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });

  return (
    <div className={classes.root}>
      <div className={classes.shape}>
        <Section className={classes.pagePaddingTop}>
          <Intro />
        </Section>
        <Hidden mdUp>
          <Section
            className={clsx(classes.sectionNoPaddingTop, classes.alignCenter)}
          >
            <ImageNode
              title={
                <>
                  <b>Service waranty:</b>
                  <br />
                  24 months / 24,000 mi waranty on each job.
                </>
              }
              imgUrl="/assets/badges/security.svg"
              titleProps={{ className: classes.titleWarranty }}
              imgProps={{ className: classes.imgWarranty }}
              className={classes.containerWarranty}
            />
          </Section>
        </Hidden>
        <Section className={classes.sectionNoPaddingTop}>
          <Features />
        </Section>
        <Section className={classes.pagePaddingTop}>
          <FollowUp
            title="Repair shop comparison"
            comment="We go extra mile, to help you go more miles"
          />
        </Section>
        <Section className={classes.sectionNoPaddingTop}>
          <Advantage />
        </Section>
        <Section className={classes.pagePaddingTop}>
          <FollowUp title="How it works" comment="It's simpler than 1,2,3" />
        </Section>
        <Section className={classes.sectionNoPaddingTop}>
          <WorkSteps />
        </Section>
        <Section
          className={clsx(classes.sectionNoPaddingTop, classes.alignCenter)}
        >
          <Image
            className={classes.imgWorkStepLogo}
            src="/assets/work-step-logo.png"
            lazy
          />
        </Section>
        <Section
          className={clsx(classes.sectionNoPaddingTop, classes.alignCenter)}
        >
          <ButtonGetQuote
            rounded
            size="large"
            className={classes.buttonGetQuote}
          />
        </Section>
        <Section className={classes.pagePaddingTop}>
          <FollowUp
            title={
              <>
                People
                <Image
                  className={classes.imgLove}
                  src="/assets/badges/love.svg"
                  alt="love"
                  lazy={false}
                />
                Us
              </>
            }
            comment={
              <>
                We are not just saying it, {!isSm && <br />} they&apos;re saying
                it to...
              </>
            }
          />
        </Section>
        <Section className={classes.sectionNoPaddingTop}>
          <Feedbacks />
        </Section>
        <Section className={classes.pagePaddingTop}>
          <Candidates />
        </Section>
        <Section
          className={clsx(classes.pagePaddingTop, classes.positionRelative)}
        >
          <FollowUp
            title="Find your mechanic"
            comment="In 120+ cities and growing"
            toGetQuote
          />
        </Section>
        <Section className={classes.sectionNoPaddingTop}>
          <Location />
        </Section>
      </div>
    </div>
  );
};

export default Home;
