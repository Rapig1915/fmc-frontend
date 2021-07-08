import React, { useState } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import {
  AttachMoney,
  KeyboardArrowDown,
  KeyboardArrowRight,
} from '@material-ui/icons';
import { IReduxState } from 'src/store/reducers';
import ServiceItem from './ServiceItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0,
    marginBottom: theme.spacing(2),
    borderBottom: '1px solid #D8D8D8',

    [theme.breakpoints.down('xs')]: {},

    '& .button-expand': {
      cursor: 'pointer',
    },
  },
  boxService: {
    marginBottom: theme.spacing(1),
    background: '#EBF1FA',
    borderRadius: 6,
    padding: theme.spacing(2),
  },
  boxTotal: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
  },
  error: {
    marginTop: theme.spacing(1),
    fontWeight: 500,
    fontSize: 16,
    color: '#a9a35c',
  },
  iconService: {
    color: '#7157FF',
    marginRight: theme.spacing(1),
  },
  titleService: {
    fontWeight: 900,
    fontSize: 20,
    lineHeight: '24px',
    marginLeft: theme.spacing(1),
    color: theme.palette.common.black,
    minWidth: 60,

    '& b': {
      color: '#24CA90',
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 15,
      marginLeft: theme.spacing(0.2),
    },
  },
  titleServiceDisabled: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: '24px',
    marginLeft: theme.spacing(1),
    color: '#C5C5C5',
    minWidth: 60,

    '& b': {
      color: '#24CA90',
    },

    [theme.breakpoints.down('xs')]: {
      fontSize: 15,
      marginLeft: theme.spacing(0.2),
    },
  },
  itemService: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    '& ul, & li': {
      margin: 2,
      padding: 0,
    },
  },
  iconServiceItem: {
    color: '#DC7979',
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: 20,
    height: 20,
  },
  itemTitle: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '28px',
    color: theme.palette.common.black,

    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  itemContent: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '29px',
    color: '#7E7A92',
    paddingLeft: theme.spacing(2),
    flexGrow: 1,
  },

  boxPrice: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: theme.spacing(1),
    borderTop: '1px dashed #D8D8D8',

    '& p': {
      fontWeight: 500,
      fontSize: 20,
      lineHeight: '28px',
      color: '#2A2D3C',
      '& b': {
        color: '#30B889',
      },
      '& span': {
        display: 'inline-block',
        minWidth: 60,
      },

      [theme.breakpoints.down('xs')]: {
        fontSize: 15,
      },
    },
  },

  rejectBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

interface EstimateSummaryProps {
  className?: string;
}

const EstimateSummary = (props: EstimateSummaryProps) => {
  const { className } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const estimate = useSelector(
    (state: IReduxState) =>
      state.quote.appointment && state.quote.appointment.attributes.estimate
  );
  const [total, setTotal] = useState(estimate?.total_price);

  const handleRemoveOrAdd = (val: number, add: boolean) => {
    if (add) {
      setTotal(total ? total + val : 0);
    } else {
      setTotal(total ? total - val : 0);
    }
  };

  const handleCollapseBlock = (value: boolean) => {
    setOpen(value);
  };

  if (!estimate) return <></>;

  // TODO -- Make the key mapping its own component. Should not be configured on this page
  return (
    <Box className={clsx(classes.root, className)}>
      {Object.keys(estimate.services).map((s, ind) => (
        <ServiceItem
          onRemoveOrAdd={handleRemoveOrAdd}
          amt_services={Object.keys(estimate.services).length}
          s={s}
          service={estimate.services[s]}
        />
      ))}

      <Box key="total" className={classes.boxTotal}>
        <Box key="title" flexDirection="row" display="flex" alignItems="center">
          <AttachMoney className={classes.iconService} />
          <Typography key="title" className={classes.titleService} noWrap>
            Total:
          </Typography>
          <Box flexGrow={1} />
          <Typography key="total-price" className={classes.titleService} noWrap>
            <b>$</b> {total?.toFixed(2)}
          </Typography>
          {!open ? (
            <KeyboardArrowDown
              className="button-expand"
              onClick={() => handleCollapseBlock(true)}
            />
          ) : (
            <KeyboardArrowRight
              className="button-expand"
              onClick={() => handleCollapseBlock(false)}
            />
          )}
        </Box>
        {open && (
          <Box key="price" className={classes.boxPrice}>
            <Typography key="tax">
              <b>Tax: $</b> <span>{estimate.tax}</span>
            </Typography>
            <Typography key="total-price">
              <b>Total Price: $</b> <span>{total?.toFixed(2)}</span>
            </Typography>
            <Typography key="shop-price">
              <b>Shop price: $</b>{' '}
              <span>
                <del>{estimate.shop_price}</del>
              </span>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

EstimateSummary.defaultProps = {
  className: undefined,
};

export default EstimateSummary;
