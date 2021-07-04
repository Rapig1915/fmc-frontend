/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography, ListItemIcon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { ButtonForward } from 'src/components/atoms';
import { URL } from 'src/utils/consts';
import { IReduxState } from 'src/store/reducers';
import { logout } from 'src/store/actions';
import { useHistory } from 'react-router-dom';

interface SidebarNavProps {
  className?: string;
  onClose?: () => void;
}

const useStyles = makeStyles(() => ({
  root: {},
  listItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  listItemLink: {
    textDecoration: 'none',
  },
  closeIcon: {
    justifyContent: 'flex-end',
    cursor: 'pointer',
  },
  divider: {
    width: '100%',
  },
  buttonForward: {
    width: '150px',
    borderRadius: '31px',
  },
}));

const SidebarNav = (props: SidebarNavProps): ReactElement => {
  const { onClose, className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const loggedIn = useSelector((state: IReduxState) => state.auth.loggedIn);

  const handleClickLogout = () => {
    dispatch(logout());
    history.push(URL.HOME);
  };

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      <ListItem className={classes.closeIcon} onClick={onClose}>
        <ListItemIcon className={classes.listItemIcon}>
          <CloseIcon fontSize="small" />
        </ListItemIcon>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography
          variant="h6"
          color="primary"
          component="a"
          href={URL.HOME}
          className={classes.listItemLink}
        >
          Home
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography
          variant="h6"
          color="primary"
          component="a"
          href={URL.DASHBOARD}
          className={classes.listItemLink}
        >
          Dashboard
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        {!loggedIn ? (
          <Typography
            variant="h6"
            color="primary"
            component="a"
            href={URL.LOGIN}
            className={classes.listItemLink}
          >
            Login
          </Typography>
        ) : (
          <Typography
            variant="h6"
            color="primary"
            component="a"
            className={classes.listItemLink}
            onClick={handleClickLogout}
          >
            Logout
          </Typography>
        )}
      </ListItem>
      <ListItem className={classes.listItem}>
        <ButtonForward rounded size="small" className={classes.buttonForward} />
      </ListItem>
    </List>
  );
};

SidebarNav.defaultProps = {
  className: '',
  onClose: undefined,
};

export default SidebarNav;
