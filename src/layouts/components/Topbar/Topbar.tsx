import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Hidden,
  List,
  ListItem,
  Typography,
  IconButton,
  Container,
  Link,
} from '@material-ui/core';

import { ButtonForward, Image } from 'src/components/atoms';
import { CustomTheme } from 'src/themes';

import SvgLogo from 'src/assets/logo/FMC-logoFMC-Color-horizontal@2x.png';
import ImageServieProvider from 'src/assets/service-provider.png';
import SvgSecurity from 'src/assets/badges/security.svg';
import SvgPhone from 'src/assets/badges/phone.svg';
import SvgUser from 'src/assets/badges/user.svg';
import SvgMenu from 'src/assets/menu/menu.svg';
import SvgCall from 'src/assets/menu/call.svg';
import ButtonLogout from 'src/components/atoms/ButtonLogout';
import { ImageNode } from 'src/components/molecules';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from 'src/store/reducers';
import useDeviseQuery from 'src/hooks/useDeviseQuery';
import { URL } from 'src/utils/consts';
import { logout } from 'src/store/actions';

interface ToolbarProps {
  onSidebarOpen?: () => void;
  showMenu?: boolean;
  showServiceWarranty?: boolean;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {},
  contactBar: {
    width: '100%',
    height: '30px',
    backgroundColor: '#2A2D3C',
  },
  contactInfoContainer: {
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    color: '#FFFFFF',
    display: 'flex',
    height: '100%',
    alignItems: 'center',

    fontFamily: 'Alegreya Sans',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '0px',
    textAlign: 'left',

    '& .button': {
      fontFamily: 'Alegreya Sans',
      background: 'transparent',
      border: 'none',
      color: '#FFFFFF',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: 13,
      fontWeight: 400,
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  buttonQuote: {
    width: '150px',
    borderRadius: '31px',
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    width: '100%',
    margin: '0 auto',
  },
  listItem: {
    cursor: 'pointer',
    paddingTop: 0,
    paddingBottom: 0,
  },
  listItemText: {
    flex: '0 0 auto',
    whiteSpace: 'nowrap',
    textDecoration: 'none',

    color: '#2A2D3C',
    fontFamily: 'Alegreya Sans',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '25px',
    letterSpacing: '0px',
  },
  listItemButton: {
    whiteSpace: 'nowrap',
  },
  iconButton: {
    width: '40px',
    height: '40px',
    padding: '5px',
    '&:hover': {
      background: 'transparent',
    },
  },
  logoContainer: {
    width: '100%',
    height: 28,
    [theme.breakpoints.up('sm')]: {
      width: 120,
      minWidth: 120,
      height: 32,
    },
  },
  logoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  imageCenterAlign: {
    flexGrow: 1,
    textAlign: 'center',
  },
  contactImage1: {
    width: '20px',
    height: '20px',
    objectFit: 'contain',
    color: '#57FFC4',
    marginRight: '10px',
  },
  contactImage2: {
    width: '15px',
    height: '15px',
    objectFit: 'contain',
    color: '#57FFC4',
    marginRight: '10px',
    marginLeft: '30px',
    marginTop: '-2px',
  },
  containerPhone: {
    background: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgServiceProvider: {
    width: 30,
    height: 30,
    marginRight: theme.spacing(1),
    borderRadius: 30,
  },
  titlePhone: {
    color: '#302A3C',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: 17,
    lineHeight: '24.57px',
    textDecoration: 'none',
  },
}));

const Topbar = (props: ToolbarProps): ReactElement => {
  const { onSidebarOpen, showMenu, showServiceWarranty, ...rest } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state: IReduxState) => state.auth.loggedIn);

  const { xsOnly } = useDeviseQuery();
  const classes = useStyles();

  const handleClickLogin = () => {
    if (loggedIn) history.push(URL.DASHBOARD);
    else history.push(URL.LOGIN);
  };

  const handleClickLogout = () => {
    dispatch(logout());
    history.push(URL.HOME);
  };

  return (
    <Container>
      {showServiceWarranty && (
        <Hidden smDown>
          <div className={classes.contactBar}>
            <div className={classes.contactInfoContainer}>
              <Image
                className={classes.contactImage1}
                src={SvgSecurity}
                alt="thefront"
                lazy={false}
              />
              <div>
                <b>Service warranty:</b> 24 months / 24,000 mi warranty on each
                job.
              </div>
              <div className={classes.flexGrow} />
              {!loggedIn && (
                <Image
                  className={classes.contactImage2}
                  src={SvgPhone}
                  alt="thefront"
                  lazy={false}
                />
              )}
              {!loggedIn && (
                <Link
                  key="tel-team-fixmycar"
                  className="button"
                  href="tel:(214) 799-1773"
                >
                  (214) 799-1773
                </Link>
              )}
              {!loggedIn && (
                <Image
                  className={classes.contactImage2}
                  src={SvgUser}
                  alt="thefront"
                  lazy={false}
                />
              )}
              {!loggedIn && (
                <button
                  type="button"
                  key="login"
                  className="button"
                  onClick={handleClickLogin}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </Hidden>
      )}
      {showMenu && (
        <Hidden xsDown>
          <Toolbar disableGutters className={classes.toolbar} {...rest}>
            <div className={classes.logoContainer}>
              <a href="/" title="thefront">
                <Image
                  className={clsx(
                    classes.logoImage,
                    xsOnly ? classes.imageCenterAlign : ''
                  )}
                  src={SvgLogo}
                  alt="thefront"
                  lazy={false}
                />
              </a>
            </div>
            <div className={classes.flexGrow} />
            <div>
              {!loggedIn && (
                <List className={classes.navigationContainer}>
                  <ListItem className={classes.listItem}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      className={classes.listItemText}
                      component="a"
                      href="/home"
                    >
                      Services
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      className={classes.listItemText}
                      component="a"
                      href="/signup-simple"
                    >
                      Advice
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      className={classes.listItemText}
                      component="a"
                      href="/not-found"
                    >
                      Help
                    </Typography>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      className={classes.listItemText}
                      component="a"
                      href="/not-found"
                    >
                      More
                    </Typography>
                  </ListItem>
                </List>
              )}
              {loggedIn && (
                <ImageNode
                  title={
                    <Link
                      key="tel-team-fixmycar"
                      className={classes.titlePhone}
                      href="tel:(214) 799-1773"
                    >
                      (214) 799-1773
                    </Link>
                  }
                  imgUrl={ImageServieProvider}
                  titleProps={{ className: classes.titlePhone }}
                  imgProps={{ className: classes.imgServiceProvider }}
                  className={classes.containerPhone}
                />
              )}
            </div>
            {!loggedIn && <div className={classes.flexGrow} />}
            <List className={classes.navigationContainer}>
              <ListItem className={classes.listItem}>
                {!loggedIn && (
                  <ButtonForward
                    rounded
                    size="small"
                    className={classes.buttonQuote}
                  />
                )}
                {loggedIn && (
                  <ButtonLogout onClickHandler={handleClickLogout} />
                )}
              </ListItem>
            </List>
          </Toolbar>
        </Hidden>
      )}
      <Hidden smUp>
        <Toolbar disableGutters className={classes.toolbar} {...rest}>
          <IconButton
            className={classes.iconButton}
            onClick={onSidebarOpen}
            aria-label="Menu"
          >
            <Image src={SvgMenu} />
          </IconButton>
          <div className={classes.logoContainer}>
            <a href="/" title="thefront">
              <Image
                className={clsx(
                  classes.logoImage,
                  xsOnly ? classes.imageCenterAlign : ''
                )}
                src={SvgLogo}
                alt="thefront"
                lazy={false}
              />
            </a>
          </div>
          <div className={classes.flexGrow} />
          <IconButton className={classes.iconButton} aria-label="Menu">
            <Link href="tel:(214) 799-1773">
              <Image src={SvgCall} />
            </Link>
          </IconButton>
        </Toolbar>
      </Hidden>
    </Container>
  );
};

Topbar.defaultProps = {
  onSidebarOpen: undefined,
  showMenu: true,
  showServiceWarranty: true,
};

export default Topbar;
