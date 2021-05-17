import React, { ReactElement } from 'react';
import { Star } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';

interface StarRatingProps {
  className?: string;
  total?: number;
  fill?: number;
}

const useStyles = makeStyles(() => ({
  starDefault: {
    color: '#FFFFFF',
  },
  starFilled: {
    color: '#FFB800',
  },
}));

/**
 * Component to display the Count Up Numbers
 *
 * @param {StarRatingProps} props
 */
const StarRating = (props: StarRatingProps): ReactElement => {
  const { className, total, fill, ...rest } = props;

  const classes = useStyles();

  const XX = [];
  for (let i = 1; i <= (total || 0); i += 1) XX.push(i);

  return (
    <div className={className} {...rest}>
      {XX.map((x) => (
        <Star
          key={x}
          className={
            x <= (fill || 0) ? classes.starFilled : classes.starDefault
          }
        />
      ))}
    </div>
  );
};

StarRating.defaultProps = {
  total: 5,
  fill: 5,
  className: undefined,
};

export default StarRating;
