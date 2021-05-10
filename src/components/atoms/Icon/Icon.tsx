import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';

interface IconProps {
  fontIconClass?: string;
  size?: 'extraSmall' | 'small' | 'medium' | 'large';
  fontIconColor?: string;
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {},
  extraSmall: {
    fontSize: 10,
  },
  small: {
    fontSize: 20,
  },
  medium: {
    fontSize: 30,
  },
  large: {
    fontSize: 40,
  },
}));

/**
 * Component to display the icon
 *
 * @param IconProps props
 */
const Icon = (props: IconProps): ReactElement => {
  const { fontIconClass, size, fontIconColor, className } = props;

  const classes = useStyles();

  return (
    <NoSsr>
      <i
        className={clsx(
          'icon',
          classes.root,
          fontIconClass,
          classes[size || 'medium'],
          className
        )}
        style={{ color: fontIconColor }}
      />
    </NoSsr>
  );
};

Icon.defaultProps = {
  fontIconClass: '',
  fontIconColor: '#0000FF',
  className: '',
  size: 'medium',
};

export default Icon;
