import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Chip, Hidden } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { CustomTheme } from 'src/themes';
import { TabSelector } from 'src/components/molecules';
import { itemsLocation } from '../../data';

interface LocationProps {
  className?: undefined;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  flexGrow: {
    flexGrow: 1,
  },

  containerLocation: {
    margin: '20px',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      margin: 0,
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

  titleState: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 800,
    fontSize: '30px',
    lineHeight: '40px',
    color: '#FFFFFF',
    width: '100%',
    textAlign: 'center',
    padding: 0,
    marginTop: '10px',
    marginBottom: '0px',
  },
  descriptionState: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '29px',
    color: '#D5C3F2',
    width: '100%',
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
  cityContainer: {
    flexGrow: 1,
    marginTop: '30px',
    marginBottom: '30px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    maxHeight: '400px',
    overflow: 'hidden',
  },
  buttonCity: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '40px',
    color: theme.palette.common.white,
    padding: '20px',
    borderRadius: '40px',
    marginBottom: '5px',
    marginTop: '5px',
  },

  buttonExpand: {
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
    color: theme.palette.common.white,
    backgroundColor: 'transparent',
    border: '1px solid white',
  },
}));

const Location = (props: LocationProps): ReactElement => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Hidden mdUp>
        <TabSelector
          items={itemsLocation.map((x) => x.state)}
          selectedIndex={0}
        />
      </Hidden>
      <Grid
        container
        justify="center"
        spacing={0}
        direction={isMd ? 'row' : 'column'}
      >
        {itemsLocation &&
          itemsLocation.map(
            (x, index) =>
              (isMd || !index) && (
                <Grid
                  key={x.state}
                  item
                  container
                  alignItems="center"
                  xs={12}
                  md={6}
                  // data-aos="fade-up"
                >
                  <div className={classes.containerLocation}>
                    <div
                      className={classes.containerAdvantageMask1}
                      key="mask1"
                    />
                    <div
                      className={classes.containerAdvantageMask2}
                      key="mask2"
                    />
                    <h1 className={classes.titleState}>{x.state}</h1>
                    <h4 className={classes.descriptionState}>
                      {x.description}
                    </h4>
                    <div className={classes.cityContainer}>
                      {x.city &&
                        x.city.map((c) => (
                          <Chip
                            className={classes.buttonCity}
                            color="primary"
                            label={c || ''}
                            key={c}
                          />
                        ))}
                    </div>
                    <div className={classes.buttonExpand}>
                      <KeyboardArrowDownIcon />
                    </div>
                  </div>
                </Grid>
              )
          )}
      </Grid>
    </div>
  );
};

Location.defaultProps = {
  className: undefined,
};

export default Location;
