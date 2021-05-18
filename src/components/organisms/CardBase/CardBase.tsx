import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';

interface CardBaseProps {
  children: React.ReactNode;

  className?: string;
  withShadow?: boolean;
  noShadow?: boolean;
  noBorder?: boolean;
  noBg?: boolean;
  liftUp?: boolean;
  align?: 'left' | 'right' | 'center';
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
  },
  withShadow: {
    boxShadow: `0 2px 10px 0 rgba(23, 70, 161, .11)`,
  },
  noShadow: {
    boxShadow: 'none',
  },
  noBorder: {
    border: 0,
  },
  noBg: {
    background: 'transparent',
  },
  liftUp: {
    transition:
      'box-shadow .25s ease,transform .25s ease,-webkit-transform .25s ease',
    '&:hover': {
      boxShadow:
        '0 1.5rem 2.5rem rgba(22,28,45,.1),0 .3rem 0.5rem -.50rem rgba(22,28,45,.05) !important',
      transform: 'translate3d(0,-5px,0)',
    },
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4, 2),
    '&:last-child': {
      padding: theme.spacing(4, 2),
    },
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6, 3),
      '&:last-child': {
        padding: theme.spacing(6, 3),
      },
    },
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  },
  center: {
    alignItems: 'center',
  },
}));

/**
 * Component to display the basic card
 *
 * @param {Object} props
 */
const CardBase = (props: CardBaseProps): ReactElement => {
  const {
    withShadow,
    noShadow,
    noBorder,
    noBg,
    liftUp,
    children,
    align,
    className,
    ...rest
  } = props;

  const classes = useStyles();

  return (
    <Card
      className={clsx(
        'card-base',
        classes.root,
        withShadow ? classes.withShadow : {},
        noShadow ? classes.noShadow : {},
        noBorder ? classes.noBorder : {},
        noBg ? classes.noBg : {},
        liftUp ? classes.liftUp : {},
        className
      )}
      {...rest}
    >
      <CardContent
        className={clsx(
          'card-base__content',
          classes.content,
          classes[align || 'center']
        )}
      >
        {children}
      </CardContent>
    </Card>
  );
};

CardBase.defaultProps = {
  className: undefined,
  withShadow: false,
  noShadow: true,
  noBorder: false,
  noBg: false,
  liftUp: true,
  align: 'center',
};

export default CardBase;
