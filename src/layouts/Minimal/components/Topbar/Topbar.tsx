import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { colors, Toolbar } from '@material-ui/core';

import { Image } from 'src/components/atoms';
import { CustomTheme } from 'src/themes';

interface TopbarProps {
  onSidebarOpen?: () => void;
  className?: string;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    boxShadow: 'none',
    background: theme.palette.common.white,
    borderBottom: `1px solid ${colors.grey[200]}`,
  },
  toolbar: {
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
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
}));

const Topbar = (props: TopbarProps): ReactElement => {
  const { onSidebarOpen, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Toolbar className={clsx(classes.toolbar, className)} {...rest}>
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
    </Toolbar>
  );
};

Topbar.defaultProps = {
  onSidebarOpen: undefined,
  className: undefined,
};

export default Topbar;
