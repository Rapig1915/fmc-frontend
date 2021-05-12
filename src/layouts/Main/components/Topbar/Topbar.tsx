import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Hidden,
  List,
  ListItem,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { Image, ButtonGetQuote } from 'src/components/atoms';
import { CustomTheme } from 'src/themes';

interface ToolbarProps {
  onSidebarOpen?: any;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {},
  contactBar: {
    width: '100%',
    height: '30px',
    backgroundColor: '#2A2D3C',
  },
  contactInfoContainer: {
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    color: '#FFFFFF',
    display: 'flex',
    height: '100%',
    alignItems: 'center',

    fontFamily: 'Artegra Sans',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: '0px',
    textAlign: 'left',
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
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
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
    fontFamily: 'Artegra Sans',
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
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
  logoContainer: {
    width: 100,
    height: 28,
    [theme.breakpoints.up('md')]: {
      width: 120,
      height: 32,
    },
  },
  logoImage: {
    width: '100%',
    height: '100%',
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
  },
}));

const Topbar = (props: ToolbarProps): ReactElement => {
  const { onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  return (
    <>
      <Hidden smDown>
        <div className={classes.contactBar}>
          <div className={classes.contactInfoContainer}>
            <Image
              className={classes.contactImage1}
              src="/assets/badges/security.svg"
              alt="thefront"
              lazy={false}
            />
            <div>
              <b>Service waranty:</b> 24 months / 24,000 mi waranty on each job.
            </div>
            <div className={classes.flexGrow} />
            <Image
              className={classes.contactImage2}
              src="/assets/badges/phone.svg"
              alt="thefront"
              lazy={false}
            />
            <div>(214) 620-0702</div>
            <Image
              className={classes.contactImage2}
              src="/assets/badges/user.svg"
              alt="thefront"
              lazy={false}
            />
            <div>(214) 620-0702</div>
          </div>
        </div>
      </Hidden>
      <Toolbar disableGutters className={classes.toolbar} {...rest}>
        <div className={classes.logoContainer}>
          <a href="/" title="thefront">
            <Image
              className={classes.logoImage}
              src="/assets/logo.svg"
              alt="thefront"
              lazy={false}
            />
          </a>
        </div>
        <div className={classes.flexGrow} />
        <div>
          <Hidden xsDown>
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
          </Hidden>
        </div>
        <div className={classes.flexGrow} />
        <Hidden xsDown>
          <List className={classes.navigationContainer}>
            <ListItem className={classes.listItem}>
              <ButtonGetQuote
                rounded
                size="small"
                className={classes.buttonQuote}
              />
            </ListItem>
          </List>
        </Hidden>
        <Hidden smUp>
          <IconButton
            className={classes.iconButton}
            onClick={onSidebarOpen}
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </>
  );
};

Topbar.defaultProps = {
  onSidebarOpen: undefined,
};

export default Topbar;
