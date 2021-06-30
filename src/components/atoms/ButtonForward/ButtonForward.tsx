import React, { ReactElement } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, PropTypes } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

interface ButtonForwardProps {
  title?: string;
  rounded?: boolean;
  disabled?: boolean;
  color?: PropTypes.Color | undefined;
  size?: 'medium' | 'large' | 'small';
  noIcon?: boolean;
  processing?: boolean;
  transparent?: boolean;

  className?: string;
  onClickHandler?: () => void;
}

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: (props: ButtonForwardProps) =>
      props.rounded ? '31px' : undefined,
    textTransform: 'none',
    fontFamily: 'Artegra Sans',
    fontStyle: 'normal',
    fontWeight: 500,
    backgroundColor: (props: ButtonForwardProps) =>
      props.transparent ? 'transparent' : undefined,
    boxShadow: (props: ButtonForwardProps) =>
      props.transparent ? 'none' : undefined,
  },
  spin: {
    width: 10,
    height: 10,
  },
});

export default function ButtonForward(props: ButtonForwardProps): ReactElement {
  const {
    title,
    rounded,
    disabled,
    color,
    size,
    transparent,
    processing,
    className,
    onClickHandler,
    noIcon,
  } = props;
  const classes = useStyles({ rounded, transparent });

  return (
    <Button
      variant="contained"
      color={color}
      size={size}
      className={clsx(classes.root, className)}
      endIcon={
        processing ? (
          <CircularProgress color="secondary" size={20} />
        ) : (
          !noIcon && <ArrowForward />
        )
      }
      onClick={processing ? undefined : onClickHandler}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}

ButtonForward.defaultProps = {
  title: 'Get quote',
  rounded: false,
  disabled: false,
  noIcon: false,
  transparent: false,
  processing: false,
  color: 'primary',
  size: 'medium',
  className: undefined,
  onClickHandler: undefined,
};
