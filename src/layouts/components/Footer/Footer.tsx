import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  Link,
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';

import { CustomTheme } from 'src/themes';
import { Image } from 'src/components/atoms';
import { itemFooter } from 'src/utils/data';

import ImageFootBack from 'src/assets/footer-back.png';
import SvgLogoWhite from 'src/assets/logo-white.svg';
import SvgTrustPilot from 'src/assets/trust-pilot.svg';
import logos from 'src/assets/brands';

interface FooterProps {
  className?: string;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 0),
    },
    position: 'relative',
    overflow: 'visible',
  },
  copyrightBar: {
    background: theme.palette.background.footer,
    width: '100%',
    height: '50px',
    fontFamily: 'Lato',
    fontWeight: 400,
    fontSize: '15px',
    lineHeight: '29px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#636078',
  },
  footerContainer: {
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
  },
  logoContainerItem: {
    paddingTop: 0,
  },
  logoContainer: {
    height: 32,
    display: 'flex',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
    },
  },
  logoImage: {
    width: '100%',
    height: '100%',
    color: '#FFFFFF',
  },
  socialIcon: {
    padding: 0,
    marginRight: theme.spacing(1),
    color: 'rgba(255,255,255,.6)',
    '&:hover': {
      background: 'transparent',
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  icon: {
    fontSize: 24,
  },
  imgBack: {
    position: 'absolute',
    opacity: 0.8,
    bottom: 0,
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    background: theme.palette.background.footer,
    opacity: 0.9,
    width: '100%',
    height: '100%',
  },
  menuContainer: {
    width: '100%',
    alignItems: 'flex-start',
    '& h2': {
      fontFamily: 'Lato',
      fontWeight: 600,
      fontStyle: 'normal',
      fontSize: '20px',
      lineHeight: '40px',
      color: '#FFFFFF',
      marginBottom: 0,
    },
    '& h6': {
      fontFamily: 'Lato',
      fontWeight: 400,
      fontStyle: 'normal',
      fontSize: '17px',
      lineHeight: '29px',
      color: '#7E7A92',
      padding: 0,
      margin: 0,
      minWidth: '120px',
      cursor: 'pointer',
      '&:hover': {
        color: '#7E7AB2',
        textDecoration: 'underline',
      },
    },
    '& hr': {
      width: '100%',
      backgroundColor: '#585266',
      color: '#585266',
      height: '1px',
      border: 'none',
    },
  },
  carMakers: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'baseline',
    alignItems: 'center',
  },
}));

const Footer = (props: FooterProps): ReactElement => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const capitalize = (s: string): string =>
    s.charAt(0).toUpperCase() + s.slice(1);

  const allModels = React.useMemo(() => {
    return Object.keys(logos).map((brand) => capitalize(brand));
  }, []);

  return (
    <Container>
      <div {...rest} className={clsx(classes.root, className)}>
        <Image
          className={classes.imgBack}
          src={ImageFootBack}
          alt="thefront"
          lazy={false}
        />
        <div key="mask" className={classes.mask} />
        <div className={classes.footerContainer}>
          <List disablePadding>
            <ListItem disableGutters className={classes.logoContainerItem}>
              <div className={classes.logoContainer}>
                <a href="/" title="thefront">
                  <Image
                    className={classes.logoImage}
                    src={SvgLogoWhite}
                    alt="thefront"
                    lazy={false}
                  />
                </a>
                <Hidden xsDown>
                  <a href="/" title="thefront">
                    <Image
                      className={classes.logoImage}
                      src={SvgTrustPilot}
                      alt="thefront"
                      lazy={false}
                    />
                  </a>
                </Hidden>
              </div>
            </ListItem>
            <ListItem disableGutters>
              <Grid container spacing={3} className={classes.menuContainer}>
                <Grid item md={3} sm={4} xs={12}>
                  <h2>Contact Us</h2>
                  <hr />
                  <h6>team@fixmycar.io</h6>
                  <h6>(214) 620-0702</h6>
                  <div>
                    <IconButton className={classes.socialIcon}>
                      <FacebookIcon className={classes.icon} />
                    </IconButton>
                    <IconButton className={classes.socialIcon}>
                      <InstagramIcon className={classes.icon} />
                    </IconButton>
                    <IconButton className={classes.socialIcon}>
                      <TwitterIcon className={classes.icon} />
                    </IconButton>
                    <IconButton className={classes.socialIcon}>
                      <PinterestIcon className={classes.icon} />
                    </IconButton>
                  </div>
                  <h2>Menu</h2>
                  <hr />
                  {itemFooter &&
                    itemFooter.menu &&
                    itemFooter.menu.map((m) => <h6 key={m}>{m}</h6>)}
                </Grid>
                <Hidden xsDown>
                  <Grid
                    item
                    md={9}
                    sm={8}
                    xs={12}
                    className={classes.carMakers}
                  >
                    <h2>Car Makes</h2>
                    <hr />
                    {itemFooter &&
                      allModels &&
                      allModels.map(
                        (c) =>
                          c !== 'Blank' && (
                            <Link href={`https://www.fixmycar.io/car/${c}`}>
                              <h6 key={c}>{c}</h6>
                            </Link>
                          )
                      )}
                  </Grid>
                </Hidden>
              </Grid>
            </ListItem>
          </List>
        </div>
      </div>
      <div className={classes.copyrightBar}>
        © FixMyCar.io - 2021 | Privacy Policy | Terms of Service
      </div>
    </Container>
  );
};

Footer.defaultProps = {
  className: undefined,
};

export default Footer;
