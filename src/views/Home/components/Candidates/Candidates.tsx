import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Hidden } from '@material-ui/core';
import { Check, KeyboardArrowRight } from '@material-ui/icons';
import { Image, ButtonGetQuote, StarRating } from 'src/components/atoms';
import { SectionHeader, ImageNode } from 'src/components/molecules';
import { CardBase } from 'src/components/organisms';
import { itemsCandidates } from 'src/utils/data';

interface CandidatesProps {
  className?: undefined;
}

const useStyles = makeStyles((theme) => ({
  root: {},

  buttonGetQuote: {
    marginTop: '20px',
    width: '200px',
    [theme.breakpoints.down('xs')]: {
      marginTop: 0,
    },
  },
  introSubtitle: {
    fontFamily: 'Artegra Sans',
    fontSize: '22px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '30px',
    color: '#7E7A92',
  },
  introTitle: {
    fontFamily: 'Lato',
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 900,
    lineHeight: '40px',
    color: '#2A2D3C',
    marginTop: '20px',
  },

  containerCandidates: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'row',
    overflow: 'hidden',
    zIndex: 1,
  },
  cardCandidate: {
    minWidth: '300px',
    maxWidth: '50%',
    marginTop: '50px',
    position: 'relative',
    overflow: 'visible',
    zIndex: 1,
    cursor: 'pointer',
    paddingTop: '20px',
    margin: '10px',
  },
  imgCandidate: {
    width: '100px',
    height: '100px',
    position: 'absolute',
    top: '-50px',
    borderRadius: '100px',
    zIndex: 2,
  },
  countReview: {
    fontFamily: 'Artegra Sans',
    fontWeight: 500,
    fontStyle: 'italic',
    fontSize: '15px',
    lineHeight: '20.75px',
    textAlign: 'center',
    color: '#7157FF',
  },
  bio: {
    fontFamily: 'Adobe Casion Pro',
    fontWeight: 600,
    fontStyle: 'italic',
    fontSize: '20px',
    lineHeight: '29px',
    color: '#2A2D3C',
    '& > span': {
      color: '#7157FF',
    },
  },
  containerMention: {
    marginTop: '20px',
    width: '100%',
    fontFamily: 'Artegra Sans',
    fontWeight: 500,
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '40.86px',
    '& svg': {
      color: '#36D9A0',
      marginRight: '10px',
    },
  },
  containerBadge: {
    width: '100%',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  boxBadge: {
    width: 'auto',
    flexDirection: 'column',
  },
  titleBadge: {
    maxWidth: '80px',
    fontFamily: 'Artegra Sans',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '17.96px',
    color: '#2A2D3C',
    marginLeft: '10px',
  },
  imgBadge: {
    background: '#F6F6F6',
    borderRadius: '5px',
    padding: '20px',
    width: '80px',
    height: '80px',
    color: '#0E1E32',
  },

  buttonSeeMore: {
    position: 'absolute',
    top: '50%',
    right: 0,
    width: '40px',
    height: '40px',
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: '30px',
    lineHeight: '40px',
    borderRadius: '40px',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#7157FF',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #7157FF',
    zIndex: 2,
  },
}));

const Candidates = (props: CandidatesProps): ReactElement => {
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
          // className={classes.containerFlexColumn}
          direction="column"
        >
          <SectionHeader
            title={<span>Meet your new mechanics</span>}
            subtitle={
              <span>Honest, certified, good mechanics ready when you are</span>
            }
            ctaGroup={[
              <Hidden smDown>
                <ButtonGetQuote
                  rounded
                  size="large"
                  className={classes.buttonGetQuote}
                />
              </Hidden>,
            ]}
            align="left"
            disableGutter
            titleVariant="h3"
            titleProps={{
              className: classes.introTitle,
            }}
            subtitleVariant="h6"
            subtitleProps={{
              className: classes.introSubtitle,
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          lg={9}
          // data-aos="fade-up"
          className={classes.containerCandidates}
        >
          {itemsCandidates &&
            itemsCandidates.map((x) => (
              <CardBase
                key={x.name}
                withShadow
                liftUp
                className={classes.cardCandidate}
              >
                <Image
                  className={classes.imgCandidate}
                  src={`/assets/candidates/${x.photo}`}
                  lazy={false}
                />
                <StarRating />
                <h3 className={classes.countReview}>{x.review} reviews</h3>
                <p className={classes.bio}>
                  {x.bio} <span>read more</span>
                </p>
                <div key="mention" className={classes.containerMention}>
                  {x.mention &&
                    x.mention.map((m) => (
                      <div key={m}>
                        <Check /> {m}
                      </div>
                    ))}
                </div>
                <div key="badge" className={classes.containerBadge}>
                  {x.badge &&
                    x.badge.map((b) => (
                      <ImageNode
                        key={b}
                        title={b}
                        imgUrl={`/assets/badges/${b
                          .toLowerCase()
                          .replace(' ', '-')}.svg`}
                        titleProps={{ className: classes.titleBadge }}
                        imgProps={{ className: classes.imgBadge }}
                        align="center"
                        className={classes.boxBadge}
                      />
                    ))}
                </div>
              </CardBase>
            ))}
          <div className={classes.buttonSeeMore}>
            <KeyboardArrowRight />
          </div>
        </Grid>
        <Hidden smUp>
          <Grid item xs={12} sm={12}>
            <ButtonGetQuote
              rounded
              size="large"
              className={classes.buttonGetQuote}
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
};

Candidates.defaultProps = {
  className: undefined,
};

export default Candidates;
