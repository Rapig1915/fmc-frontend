import React, { ReactElement } from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { PropTypes } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

interface ButtonGetQuoteProps {
  rounded?: boolean;
  color?: PropTypes.Color | undefined;
  size?: 'medium' | 'large' | 'small';
  className?: string;
  onClickHandler?: () => void;
}

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: (props: ButtonGetQuoteProps) =>
      props.rounded ? '31px' : undefined,
    textTransform: 'none',
    fontFamily: 'Artegra Sans',
    fontStyle: 'normal',
    fontWeight: 500,
  },
});

export default function ButtonGetQuote(
  props: ButtonGetQuoteProps
): ReactElement {
  const { rounded, color, size, className, onClickHandler } = props;
  const classes = useStyles({ rounded });

  return (
    <Button
      variant="contained"
      color={color}
      size={size}
      className={clsx(classes.root, className)}
      endIcon={<ArrowForward />}
      onClick={onClickHandler}
    >
      Get quote
    </Button>
  );
}

ButtonGetQuote.defaultProps = {
  rounded: false,
  color: 'primary',
  size: 'medium',
  className: undefined,
  onClickHandler: undefined,
};
