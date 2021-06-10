/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Typography, ListItemIcon } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { ButtonForward } from 'src/components/atoms';

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
          href="/home"
          className={classes.listItemLink}
        >
          Services
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography
          variant="h6"
          color="primary"
          component="a"
          href="/signup-simple"
          className={classes.listItemLink}
        >
          Advice
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography
          variant="h6"
          color="primary"
          component="a"
          href="/not-found"
          className={classes.listItemLink}
        >
          Help
        </Typography>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Typography
          variant="h6"
          color="primary"
          component="a"
          href="/not-found"
          className={classes.listItemLink}
        >
          More
        </Typography>
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
