import React, { ReactElement, useState, useEffect } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import {
  AttachMoney,
  KeyboardArrowDown,
  KeyboardArrowRight,
  RemoveCircle,
} from '@material-ui/icons';
import { IReduxState } from 'src/store/reducers';

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

    // borderBottom: '1px dashed #D8D8D8',
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
}));

interface EstimateSummaryProps {
  className?: string;
}

const EstimateSummary = (props: EstimateSummaryProps): ReactElement => {
  const { className } = props;

  const classes = useStyles();

  const estimate = useSelector(
    (state: IReduxState) =>
      state.quote.appointment && state.quote.appointment.attributes.estimate
  );

  const [statusBlockExpanded, setStatusBlockExpanded] = useState<{
    [key: string]: boolean;
  }>({});

  const handleCollapseBlock = (index: number | string, value: boolean) => {
    setStatusBlockExpanded((state) => ({
      ...state,
      [index]: value,
    }));
  };

  useEffect(() => {
    setStatusBlockExpanded({});
  }, [estimate]);

  if (!estimate) return <></>;

  return (
    <Box className={clsx(classes.root, className)}>
      {Object.keys(estimate.services).map((s, ind) => (
        <Box
          key={`service-${estimate.services[s].id}`}
          className={classes.boxService}
        >
          <Box
            key="title"
            flexDirection="row"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <AttachMoney className={classes.iconService} />
            <Typography key="title" className={classes.titleService} noWrap>
              {s}:
            </Typography>
            <Box flexGrow={1} />
            <Typography key="price" className={classes.titleService} noWrap>
              <b>$</b> {estimate.services[s].total_price}
            </Typography>
            {!statusBlockExpanded[ind] ? (
              <KeyboardArrowDown
                className="button-expand"
                onClick={() => handleCollapseBlock(ind, true)}
              />
            ) : (
              <KeyboardArrowRight
                className="button-expand"
                onClick={() => handleCollapseBlock(ind, false)}
              />
            )}
          </Box>
          {statusBlockExpanded[ind] && (
            <Box
              key="item"
              flexDirection="row"
              display="flex"
              alignItems="center"
              className={classes.itemService}
            >
              <RemoveCircle className={classes.iconServiceItem} />
              <Box key="content" className={classes.itemContent}>
                <Typography className={classes.itemTitle}>{s}</Typography>
                <List>
                  {estimate.services[s].parts.map((part) => (
                    <ListItem key={part.id}>• {part.name}</ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          )}
          {statusBlockExpanded[ind] && (
            <Box key="price" className={classes.boxPrice}>
              <Typography key="price-total">
                <b>Total Parts: $</b>{' '}
                <span>{estimate.services[s].parts_price}</span>
              </Typography>
              <Typography key="price-labor">
                <b>Labor: $</b> <span>{estimate.services[s].labor_price}</span>
              </Typography>
            </Box>
          )}
        </Box>
      ))}
      <Box key="total" className={classes.boxTotal}>
        <Box key="title" flexDirection="row" display="flex" alignItems="center">
          <AttachMoney className={classes.iconService} />
          <Typography key="title" className={classes.titleService} noWrap>
            Total:
          </Typography>
          <Box flexGrow={1} />
          <Typography key="total-price" className={classes.titleService} noWrap>
            <b>$</b> {estimate.total_price}
          </Typography>
          {!statusBlockExpanded.total ? (
            <KeyboardArrowDown
              className="button-expand"
              onClick={() => handleCollapseBlock('total', true)}
            />
          ) : (
            <KeyboardArrowRight
              className="button-expand"
              onClick={() => handleCollapseBlock('total', false)}
            />
          )}
        </Box>
        {statusBlockExpanded.total && (
          <Box key="price" className={classes.boxPrice}>
            <Typography key="services">
              <b>Services: $</b>{' '}
              <span>
                {Object.keys(estimate.services).reduce(
                  (sum, s) => sum + estimate.services[s].total_price,
                  0
                )}
              </span>
            </Typography>
            <Typography key="tax">
              <b>Tax: $</b> <span>{estimate.tax}</span>
            </Typography>
            <Typography key="total-price">
              <b>Total Price: $</b> <span>{estimate.total_price}</span>
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
