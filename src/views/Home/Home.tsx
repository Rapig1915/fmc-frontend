import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { colors, Divider } from '@material-ui/core';
import { Section, SectionAlternate } from 'src/components/organisms';

import { CustomTheme } from 'src/themes';
import { Image, ButtonGetQuote } from 'src/components/atoms';
import {
  Customization,
  Hero,
  Hub,
  Partners,
  Pricings,
  Intro,
  Features,
  FollowUp,
  WorkSteps,
} from './components';
import { integrations } from './data';

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    height: '100%',
    width: '100%',
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
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.shape}>
        <Section className={classes.pagePaddingTop}>
          <Intro />
        </Section>
        <Section className={classes.sectionNoPaddingTop}>
          <Features />
        </Section>
        <Section className={classes.pagePaddingTop}>
          <FollowUp
            title="Repair shop comparison"
            comment="We go extra mile, to help you go more miles"
          />
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
          <ButtonGetQuote rounded size="large" />
        </Section>
        <Section className={classes.pagePaddingTop}>
          <FollowUp
            title={
              <>
                People
                <Image
                  className={classes.imgLove}
                  src="/assets/love.svg"
                  alt="certified"
                  lazy={false}
                />
                Us
              </>
            }
            comment="We are not just saying it, they're saying it to..."
          />
        </Section>
        <Section className={classes.pagePaddingTop}>
          <FollowUp
            title="Find your mechanic"
            comment="In 120+ cities and growing"
            toGetQuote
          />
        </Section>
        {/* <Section className={classes.pagePaddingTop}>
          <Hero />
        </Section>
        <Section className={classes.sectionNoPaddingTop}>
          <Hub />
        </Section> */}
      </div>
      {/* <Section>
        <Partners data={integrations} />
      </Section>
      <SectionAlternate>
        <Customization />
      </SectionAlternate>
      <Divider />
      <SectionAlternate innerNarrowed>
        <Pricings />
      </SectionAlternate> */}
    </div>
  );
};

export default Home;
