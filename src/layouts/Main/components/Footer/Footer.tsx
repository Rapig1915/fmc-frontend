import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, List, ListItem } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';

import { CustomTheme } from 'src/themes';
import { Image } from 'src/components/atoms';

interface FooterProps {
  className?: string;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 0),
    },
    opacity: 0.9,
    height: '300px',
    position: 'relative',
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
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
  },
  logoContainerItem: {
    paddingTop: 0,
    width: theme.layout.contentWidth,
  },
  logoContainer: {
    height: 32,
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    bottom: 0,
    width: '100%',
    objectFit: 'cover',
    zIndex: -2,
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    background: theme.palette.background.footer,
    opacity: 0.9,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
}));

const Footer = (props: FooterProps): ReactElement => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <>
      <div {...rest} className={clsx(classes.root, className)}>
        <Image
          className={classes.imgBack}
          src="/assets/footer-back.png"
          alt="thefront"
          lazy
        />
        <div key="mask" className={classes.mask} />
        <div className={classes.footerContainer}>
          <List disablePadding>
            <ListItem disableGutters className={classes.logoContainerItem}>
              <div className={classes.logoContainer}>
                <a href="/" title="thefront">
                  <Image
                    className={classes.logoImage}
                    src="/assets/logo-white.svg"
                    alt="thefront"
                    lazy={false}
                  />
                </a>
                <a href="/" title="thefront">
                  <Image
                    className={classes.logoImage}
                    src="/assets/trust-pilot.svg"
                    alt="thefront"
                    lazy={false}
                  />
                </a>
              </div>
            </ListItem>
            <ListItem disableGutters>
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
            </ListItem>
          </List>
        </div>
      </div>
      <div className={classes.copyrightBar}>
        © FixMyCar.io - 2021 | Privacy Policy | Terms of Service
      </div>
    </>
  );
};

Footer.defaultProps = {
  className: undefined,
};

export default Footer;
