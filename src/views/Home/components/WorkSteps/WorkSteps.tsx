import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid } from '@material-ui/core';
import { ImageNode } from 'src/components/molecules';

interface WorkStepsProps {
  className?: undefined;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: '23px',
    lineHeight: '40px',
    color: '#2A2D3C',
  },
  img: {
    width: '120px',
    height: '120px',
    marginBottom: '20px',
  },
}));

const WorkSteps = (props: WorkStepsProps): ReactElement => {
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
          // data-aos="fade-up"
        >
          <ImageNode
            title="Get instant quote"
            imgUrl="/assets/work-step-1.png"
            className={classes.item}
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
          // data-aos="fade-up"
        >
          <ImageNode
            title="Book appointment"
            imgUrl="/assets/work-step-2.png"
            className={classes.item}
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
          // data-aos="fade-up"
        >
          <ImageNode
            title="Pay after service"
            imgUrl="/assets/work-step-3.png"
            className={classes.item}
            titleProps={{ className: classes.title }}
            imgProps={{ className: classes.img }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

WorkSteps.defaultProps = {
  className: undefined,
};

export default WorkSteps;
