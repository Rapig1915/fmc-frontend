import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ImageProps {
  src: string;
  srcSet?: string;
  alt?: string;
  lazy?: boolean;
  lazyProps?: {
    className: string;
  };
  className?: string;
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
  },
  dBlock: {
    display: 'block',
  },
}));

/**
 * Component to display the images
 *
 * @param {Object} props
 */
const Image = (props: ImageProps): ReactElement => {
  const { src, srcSet, alt, lazy, lazyProps, className } = props;

  const classes = useStyles();
  if (lazy) {
    return (
      <LazyLoadImage
        className={clsx('image', classes.root, classes.dBlock, className)}
        alt={alt}
        src={src}
        srcSet={srcSet}
        effect="opacity"
        {...lazyProps}
      />
    );
  }

  return (
    <img
      className={clsx('image', classes.root, className)}
      alt={alt}
      src={src}
      srcSet={srcSet}
    />
  );
};

Image.defaultProps = {
  alt: '...',
  srcSet: '',
  lazy: true,
  lazyProps: {
    width: 'auto',
    height: 'auto',
  },
  className: undefined,
};

export default Image;
