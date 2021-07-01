import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CustomTheme } from 'src/themes';

interface SectionAlternateProps {
  className?: string;
  children?: React.ReactNode;
  innerNarrowed?: boolean;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    background: theme.palette.background.default,
  },
  inner: {
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(6, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(12, 2),
    },
  },
  innerNarrowed: {
    maxWidth: 800,
  },
}));

/**
 * Component to display the alternative sections
 *
 * @param {SectionAlternateProps} props
 */
const SectionAlternate = (props: SectionAlternateProps): ReactElement => {
  const { children, innerNarrowed, className, ...rest } = props;

  const classes = useStyles();

  return (
    <section
      className={clsx('section-alternate', classes.root, className)}
      {...rest}
    >
      <div
        className={clsx(
          'section-alternate__content',
          classes.inner,
          innerNarrowed ? classes.innerNarrowed : {}
        )}
      >
        {children}
      </div>
    </section>
  );
};

SectionAlternate.defaultProps = {
  className: undefined,
  children: undefined,
  innerNarrowed: false,
};

export default SectionAlternate;
