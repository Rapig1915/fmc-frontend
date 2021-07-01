import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { Image } from 'src/components/atoms';

interface ImageNodeProps {
  title: React.ReactNode;
  imgUrl: string;

  className?: string;
  align?: 'right' | 'left' | 'center';
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  titleProps?: {
    className: string;
  };
  imgProps?: {
    className: string;
  };

  onClickHandler?: () => void;
}

const useStyles = makeStyles(() => ({
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
    onClickHandler,
    ...rest
  } = props;

  const classes = useStyles();

  const handleClick = () => {
    if (onClickHandler) onClickHandler();
  };

  return (
    <Box
      className={clsx(classes.root, className)}
      {...rest}
      onClick={handleClick}
    >
      <Image src={imgUrl} alt="badge" lazy={false} {...imgProps} />
      <Typography
        variant={titleVariant}
        align={align || 'center'}
        color="textPrimary"
        {...titleProps}
      >
        {title}
      </Typography>
    </Box>
  );
};

ImageNode.defaultProps = {
  className: undefined,
  align: 'left',
  titleVariant: 'h4',
  titleProps: {},
  imgProps: {},

  onClickHandler: undefined,
};

export default ImageNode;
