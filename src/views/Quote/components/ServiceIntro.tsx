import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { Box, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Image } from 'src/components/atoms';
import { URL } from 'src/utils/consts';

import ImageQuoteIntro from 'src/assets/quote-intro.png';
import { carFacts } from 'src/utils/data';

interface ServiceIntroProps {
  className?: string;
  modalView?: boolean;
  rounded?: boolean;
  withLink?: boolean;
}

const useStyles = makeStyles((theme) => ({
  intro: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    background: '#493F82',
    padding: theme.spacing(4),
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    borderRadius: (props: ServiceIntroProps) => (props.rounded ? 9 : undefined),
    textAlign: 'center',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(4),
    },
    '& h1': {
      margin: 0,
      color: theme.palette.common.white,
      fontFamily: 'Pacifico',
      fontSize: 25,
      fontWeight: 500,
      marginLeft: theme.spacing(6),
      textAlign: 'left',
    },
    '& h3': {
      marginTop: theme.spacing(2),
      color: '#D5C3F2',
      fontFamily: 'Lato',
      fontSize: 19,
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '27px',
      marginLeft: theme.spacing(6),
      textAlign: 'left',
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  icon: {
    color: theme.palette.common.white,
    width: 40,
    height: 40,
    position: 'absolute',
    top: theme.spacing(4),
    left: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      left: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      left: theme.spacing(4),
      top: theme.spacing(4),
    },
  },
  image: {
    objectFit: 'contain',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    height: 'auto',
  },
  linkTerm: {
    position: 'absolute',
    width: '100%',
    bottom: theme.spacing(4),
    left: 0,
    textAlign: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
    color: '#D5C3F2',

    '.modal-view &': {
      fontSize: 18,
    },
  },
}));

const ServiceIntro = (props: ServiceIntroProps): ReactElement => {
  const { className, modalView, rounded, withLink } = props;

  const classes = useStyles({ rounded });

  const [fact, setFact] = React.useState(
    'Changing your oil every 3,000 miles will help your car last to a ripe  old age!'
  );

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setFact(carFacts[Math.floor(Math.random() * carFacts.length)]),
      5000
    );
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <Box
      className={clsx(
        'quote-service-intro',
        classes.intro,
        modalView && 'modal-view',
        className
      )}
    >
      <InfoIcon fontSize="large" className={classes.icon} />
      <h1>Did you know?</h1>
      <h3>{fact}</h3>
      <Box className={classes.flexGrow} />
      <Image
        className={classes.image}
        src={ImageQuoteIntro}
        alt="quote"
        lazy={false}
      />
      {withLink && (
        <a href={URL.DASHBOARD} className={classes.linkTerm}>
          Terms & Conditions
        </a>
      )}
    </Box>
  );
};

ServiceIntro.defaultProps = {
  className: undefined,
  modalView: false,
  rounded: false,
  withLink: true,
};

export default ServiceIntro;
