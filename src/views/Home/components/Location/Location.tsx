import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Grid, Chip } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { CustomTheme } from 'src/themes';
import { itemsLocation } from '../../data';

interface LocationProps {
  className?: undefined;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {},
  flexGrow: {
    flexGrow: 1,
  },

  containerLocation: {
    background: `url(/assets/advantage-back.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '568px',
    height: '745px',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
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
      <Grid
        container
        justify="center"
        spacing={0}
        direction={isMd ? 'row' : 'column'}
      >
        {itemsLocation &&
          itemsLocation.map((x) => (
            <Grid
              key={x.state}
              item
              container
              alignItems="center"
              xs={12}
              md={6}
              // data-aos="fade-up"
              className={classes.containerLocation}
            >
              <h1 className={classes.titleState}>{x.state}</h1>
              <h4 className={classes.descriptionState}>{x.description}</h4>
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
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

Location.defaultProps = {
  className: undefined,
};

export default Location;
