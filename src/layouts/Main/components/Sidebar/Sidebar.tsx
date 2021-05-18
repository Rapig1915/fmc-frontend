import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer } from '@material-ui/core';

import { CustomTheme } from 'src/themes';
import { SidebarNav } from './components';

interface SidebarProps {
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary' | undefined;

  className?: string;
  onClose?: () => void;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  drawer: {
    width: '100%',
    maxWidth: 400,
  },
  root: {
    height: '100%',
    padding: theme.spacing(1),
  },
  nav: {
    marginBottom: theme.spacing(1),
  },
}));

const Sidebar = (props: SidebarProps): ReactElement => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <SidebarNav className={classes.nav} onClose={onClose} />
      </div>
    </Drawer>
  );
};

Sidebar.defaultProps = {
  className: undefined,
  onClose: undefined,
};

export default Sidebar;
