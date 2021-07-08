import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { SectionHeader, ZipcodeQuote } from 'src/components/molecules';

interface FollowUpProps {
  className?: undefined;
  title: React.ReactNode;
  comment: React.ReactNode;
  toGetQuote?: boolean;
  onGetQuote?: (payload: { zip?: string; customer?: number }) => void;
}

const useStyles = makeStyles(() => ({
  root: {},
  introTitle: {
    fontFamily: 'Lato',
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 900,
    lineHeight: '40px',
    color: '#2A2D3C',
  },
  introSubtitle: {
    fontFamily: 'Alegreya Sans',
    fontSize: '22px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '30px',
    color: '#7E7A92',
  },
  zipQuote: {
    marginTop: '30px',
  },
}));

const FollowUp = (props: FollowUpProps): ReactElement => {
  const { className, title, comment, toGetQuote, onGetQuote, ...rest } = props;
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
          md={12}
          // data-aos="fade-up"
        >
          <SectionHeader
            title={<span>{title}</span>}
            subtitle={<span>{comment}</span>}
            align="center"
            disableGutter
            titleVariant="h4"
            titleProps={{
              className: classes.introTitle,
            }}
            ctaGroup={[
              toGetQuote && (
                <ZipcodeQuote
                  className={classes.zipQuote}
                  onGetQuote={onGetQuote}
                />
              ),
            ]}
            subtitleVariant="h6"
            subtitleProps={{
              className: classes.introSubtitle,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

FollowUp.defaultProps = {
  className: undefined,
  toGetQuote: false,
  onGetQuote: undefined,
};

export default FollowUp;
