import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Image } from 'src/components/atoms';
import { XOther } from 'src/common';

interface ImageNodeProps {
  title: React.ReactNode;
  imgUrl: string;

  className?: string;
  align?: 'right' | 'left' | 'center';
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleProps?: any;
  imgProps?: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
  },
}));

/**
 * Component to display the Feature Badge
 *
 * @param {ImageNodeProps} props
 */
const ImageNode = (props: ImageNodeProps): ReactElement => {
  const {
    title,
    titleVariant,
    imgUrl,
    align,
    className,
    titleProps,
    imgProps,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Image src={imgUrl} alt="badge" lazy={false} {...imgProps} />
      <Typography
        variant={titleVariant}
        align={align || 'center'}
        color="textPrimary"
        {...titleProps}
      >
        {title}
      </Typography>
    </div>
  );
};

ImageNode.defaultProps = {
  className: undefined,
  align: 'left',
  titleVariant: 'h4',
  titleProps: {},
  imgProps: {},
};

export default ImageNode;
