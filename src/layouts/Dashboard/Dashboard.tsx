import React, { ReactElement, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { CustomTheme } from 'src/themes';
import { Topbar, Sidebar } from '../components';

interface DashboardProps {
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
}));

const Dashboard = (props: DashboardProps): ReactElement => {
  const { children } = props;

  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
      })}
    >
      <Topbar
        showMenu
        showServiceWarranty={false}
        onSidebarOpen={handleSidebarOpen}
      />
      <Sidebar onClose={handleSidebarClose} open={open} variant="temporary" />
      <main>{children}</main>
    </div>
  );
};

Dashboard.defaultProps = {
  children: undefined,
};

export default Dashboard;
