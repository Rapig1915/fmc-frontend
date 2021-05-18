import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CustomTheme } from 'src/themes';

interface SectionProps {
  className?: string;
  children?: React.ReactNode;
  narrow?: boolean;
  fullWidth?: boolean;
  disablePadding?: boolean;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    maxWidth: theme.layout?.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(6, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12, 2),
    },
  },
  fullWidth: {
    maxWidth: '100%',
  },
  disablePadding: {
    padding: 0,
  },
  narrow: {
    maxWidth: 800,
  },
}));

/**
 * Component to display the sections
 *
 * @param {SectionProps} props
 */
const Section = (props: SectionProps): ReactElement => {
  const {
    children,
    fullWidth,
    narrow,
    disablePadding,
    className,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <section
      className={clsx(
        'section',
        classes.root,
        fullWidth ? classes.fullWidth : {},
        narrow ? classes.narrow : {},
        disablePadding ? classes.disablePadding : {},
        className
      )}
      {...rest}
    >
      {children}
    </section>
  );
};

Section.defaultProps = {
  className: undefined,
  children: undefined,
  narrow: false,
  fullWidth: false,
  disablePadding: false,
};

export default Section;
