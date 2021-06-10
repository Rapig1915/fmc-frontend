import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  colors,
  Hidden,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { setZip } from 'src/store/actions';
import { CustomTheme } from 'src/themes';
import { Image, ButtonForward } from 'src/components/atoms';
import { ImageNode } from 'src/components/molecules';
import { Section } from 'src/components/organisms';
import { Splash } from 'src/layouts/components';
import { URL } from 'src/utils/consts';

import SvgSecurity from 'src/assets/badges/security.svg';
import ImageWorkStepLogo from 'src/assets/work-step-logo.png';
import SvgLove from 'src/assets/badges/love.svg';

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
  const dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });

  const refFollowUpZip = React.useRef<HTMLDivElement>(null);

  const [openSplash, setOpenSplash] = React.useState(false);

  const handleClickGetQuote = (payload: {
    zip?: string;
    customer?: number;
  }) => {
    if (!payload.zip) {
      if (refFollowUpZip)
        refFollowUpZip.current?.scrollIntoView({
          behavior: 'smooth',
        });
    } else {
      dispatch(setZip(payload.zip || '', payload.customer || 0));

      setOpenSplash(true);
      setTimeout(() => {
        history.push(URL.QUOTE);
      }, 3000);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.shape}>
        <Section className={classes.pagePaddingTop}>
          <Intro onGetQuote={handleClickGetQuote} />
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
              imgUrl={SvgSecurity}
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
          <Advantage onGetQuote={handleClickGetQuote} />
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
            src={ImageWorkStepLogo}
            lazy
          />
        </Section>
        <Section
          className={clsx(classes.sectionNoPaddingTop, classes.alignCenter)}
        >
          <ButtonForward
            rounded
            size="large"
            className={classes.buttonGetQuote}
            onClickHandler={() => handleClickGetQuote({})}
          />
        </Section>
        <Section className={classes.pagePaddingTop}>
          <FollowUp
            title={
              <>
                People
                <Image
                  className={classes.imgLove}
                  src={SvgLove}
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
          <Feedbacks onGetQuote={handleClickGetQuote} />
        </Section>
        <Section className={classes.pagePaddingTop}>
          <Candidates onGetQuote={handleClickGetQuote} />
        </Section>
        <Section
          className={clsx(classes.pagePaddingTop, classes.positionRelative)}
        >
          <div ref={refFollowUpZip}>
            <FollowUp
              title="Find your mechanic"
              comment="In 120+ cities and growing"
              toGetQuote
              onGetQuote={handleClickGetQuote}
            />
          </div>
        </Section>
        <Section className={classes.sectionNoPaddingTop}>
          <Location />
        </Section>
      </Box>
      <Splash show={openSplash} />
    </Box>
  );
};

export default Home;
