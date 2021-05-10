import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, GridJustification, Typography } from '@material-ui/core';

interface SectionHeaderProps {
  title: any;

  className?: string;
  subtitle?: any;
  label?: string;
  overline?: any;
  ctaGroup?: any[];
  fadeUp?: boolean;
  align?: 'right' | 'left' | 'center';
  disableGutter?: boolean;
  titleClasses?: string;
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  subtitleVariant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2';
  subtitleColor?: 'textPrimary' | 'textSecondary' | 'primary' | 'secondary';
  labelProps?: any;
  titleProps?: any;
  subtitleProps?: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  disableGutter: {
    marginBottom: 0,
  },
  title: {
    fontWeight: 'bold',
  },
  cta: {
    marginLeft: theme.spacing(1),
    '&:first-child': {
      marginLeft: theme.spacing(0),
    },
  },
}));

/**
 * Component to display the section headers
 *
 * @param {SectionHeaderProps} props
 */
const SectionHeader = (props: SectionHeaderProps): ReactElement => {
  const {
    title,
    titleVariant,
    subtitleVariant,
    subtitle,
    subtitleColor,
    label,
    overline,
    fadeUp,
    align,
    ctaGroup,
    disableGutter,
    titleClasses,
    className,
    labelProps,
    titleProps,
    subtitleProps,
    ...rest
  } = props;

  const classes = useStyles();
  let justifyGrid: GridJustification = 'center';
  if (align === 'left') {
    justifyGrid = 'flex-start';
  } else if (align === 'right') {
    justifyGrid = 'flex-end';
  }

  return (
    <Grid
      container
      spacing={2}
      data-aos={fadeUp ? 'fade-up' : ''}
      className={clsx(
        'section-header',
        classes.root,
        disableGutter ? classes.disableGutter : {},
        className
      )}
      {...rest}
    >
      {overline && (
        <Grid
          item
          container
          justify={justifyGrid}
          xs={12}
          className="section-header__overline-wrapper"
        >
          {overline}
        </Grid>
      )}
      {label && (
        <Grid item xs={12} className="section-header__label-wrapper">
          <Typography
            variant="overline"
            color="primary"
            component="p"
            align={align || 'center'}
            {...labelProps}
          >
            {label}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} className="section-header__title-wrapper">
        <Typography
          variant={titleVariant}
          align={align || 'center'}
          className={clsx('section-header__title', classes.title, titleClasses)}
          color="textPrimary"
          {...titleProps}
        >
          {title}
        </Typography>
      </Grid>
      {subtitle && (
        <Grid item xs={12} className="section-header__subtitle-wrapper">
          <Typography
            variant={subtitleVariant || 'h6'}
            align={align || 'center'}
            color={subtitleColor || 'textSecondary'}
            className="section-header__subtitle"
            {...subtitleProps}
          >
            {subtitle}
          </Typography>
        </Grid>
      )}
      {ctaGroup && !!ctaGroup.length && (
        <Grid item xs={12} className="section-header__cta-wrapper">
          <Grid
            container
            justify={justifyGrid}
            alignItems="center"
            wrap="nowrap"
            className="section-header__cta-container"
          >
            {ctaGroup.map((item) => (
              <div
                key={`cta-${item.a}`}
                className={clsx(
                  'section-header__cta-item-wrapper',
                  classes.cta
                )}
              >
                {item}
              </div>
            ))}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

SectionHeader.defaultProps = {
  className: undefined,
  subtitle: '',
  label: '',
  overline: undefined,
  ctaGroup: [],
  fadeUp: false,
  align: 'center',
  disableGutter: false,
  titleClasses: undefined,
  titleVariant: 'h4',
  subtitleVariant: 'h6',
  subtitleColor: 'textPrimary',
  labelProps: {},
  titleProps: {},
  subtitleProps: {},
};

export default SectionHeader;
