import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

interface LearnMoreLinkProps {
  className?: string;
  component?: 'Link' | 'a';
  title: string;
  variant?: 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
  href?: string;
  color?: string;
  iconProps?: any;
  typographyProps?: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  title: {
    fontWeight: 'bold',
  },
  icon: {
    padding: 0,
    marginLeft: theme.spacing(1),
    '&:hover': {
      background: 'transparent',
    },
  },
}));

/**
 * Component to display the "Learn More" link
 *
 * @param {LearnMoreLinkProps} props
 */
const LearnMoreLink = (props: LearnMoreLinkProps): ReactElement => {
  const {
    color,
    // component,
    variant,
    title,
    href,
    className,
    iconProps,
    typographyProps,
  } = props;

  const classes = useStyles();

  const children = (
    <>
      <Typography
        component="span"
        className={clsx('learn-more-link__typography', classes.title)}
        variant={variant}
        color={color || 'primary'}
        {...typographyProps}
      >
        {title}
      </Typography>
      <IconButton
        className={clsx('learn-more-link__icon-button', classes.icon)}
        color={color || 'primary'}
        {...iconProps}
      >
        <ArrowRightAltIcon className="learn-more-link__arrow" />
      </IconButton>
    </>
  );

  return (
    <a href={href} className={clsx('learn-more-link', classes.root, className)}>
      {children}
    </a>
  );
};

LearnMoreLink.defaultProps = {
  variant: 'subtitle1',
  href: '#',
  typographyProps: {},
  iconProps: {},
  component: 'a',
  color: 'primary',
  className: undefined,
};

export default LearnMoreLink;
