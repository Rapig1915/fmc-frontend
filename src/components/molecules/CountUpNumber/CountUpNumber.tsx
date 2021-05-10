import React, { ReactElement } from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import CountUp from 'react-countup';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';

interface CountUpNumberProps {
  className?: string;
  suffix?: string;
  prefix?: string;
  start?: number;
  end: number;
  textColor?: string;
  labelColor?: string;
  visibilitySensorProps?: any;
  wrapperProps?: any;
  countWrapperProps?: any;
  countNumberProps?: any;
  labelProps?: any;
  label: string;
}

/**
 * Component to display the Count Up Numbers
 *
 * @param {CountUpNumberProps} props
 */
const CountUpNumber = (props: CountUpNumberProps): ReactElement => {
  const {
    start,
    end,
    suffix,
    prefix,
    label,
    textColor,
    labelColor,
    className,
    visibilitySensorProps,
    wrapperProps,
    countWrapperProps,
    countNumberProps,
    labelProps,
    ...rest
  } = props;

  const [viewPortEntered, setViewPortEntered] = React.useState(false);
  const setViewPortVisibility = (isVisible: boolean) => {
    if (viewPortEntered) {
      return;
    }

    setViewPortEntered(isVisible);
  };

  return (
    <div className={clsx('countup-number', className)} {...rest}>
      <VisibilitySensor
        onChange={(isVisible: boolean) => setViewPortVisibility(isVisible)}
        delayedCall
        className="countup-number__visibility-sensor"
        {...visibilitySensorProps}
      >
        <div className="countup-number__wrapper" {...wrapperProps}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            color={textColor || 'textPrimary'}
            className="countup-number__count-wrapper"
            {...countWrapperProps}
          >
            <CountUp
              delay={1}
              redraw={false}
              end={viewPortEntered ? end : start}
              start={start}
              suffix={suffix || ''}
              prefix={prefix || ''}
              className="countup-number__count"
              {...countNumberProps}
            />
          </Typography>
          <Typography
            variant="subtitle1"
            color={labelColor || 'textSecondary'}
            align="center"
            className="countup-number__label"
            {...labelProps}
          >
            {label}
          </Typography>
        </div>
      </VisibilitySensor>
    </div>
  );
};

CountUpNumber.defaultProps = {
  start: 0,
  visibilitySensorProps: {},
  wrapperProps: {},
  countWrapperProps: {},
  countNumberProps: {},
  labelProps: {},
  className: undefined,
  prefix: '',
  suffix: '',
  textColor: 'textPrimary',
  labelColor: 'textPrimary',
};

export default CountUpNumber;
