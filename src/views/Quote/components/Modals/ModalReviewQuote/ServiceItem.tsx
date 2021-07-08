import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {
  AttachMoney,
  KeyboardArrowDown,
  KeyboardArrowRight,
  RemoveCircle,
  RadioButtonUncheckedRounded,
} from '@material-ui/icons';
import { estimateItemStatus } from 'src/store/actions';
import { updateEstimateServiceStatus } from '../../../../../api/quote';

interface IPart {
  id: number;
  name: string;
}

interface ServiceItemProps {
  onRemoveOrAdd: (arg0: number, arg1: boolean) => void;
  amt_services: number;
  s: string;
  service: {
    id: number;
    status: string;
    total_price: number;
    parts: [IPart];
    parts_price: number;
    labor_price: number;
  };
}

const useStyles = makeStyles((theme) => ({
  boxService: {
    marginBottom: theme.spacing(1),
    background: '#EBF1FA',
    borderRadius: 6,
    padding: theme.spacing(2),
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
  rejectBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconServiceItem: {
    color: '#DC7979',
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    width: 20,
    height: 20,
  },
  iconServiceItemInactive: {
    color: '#1B1212',
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
}));

const ServiceItem = (props: ServiceItemProps) => {
  const classes = useStyles();
  const { amt_services: amtServices, s, service, onRemoveOrAdd } = props;
  const {
    id,
    status,
    total_price: totalPrice,
    parts,
    parts_price: partsPrice,
    labor_price: laborPrice,
  } = service;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleCollapseBlock = (value: boolean) => {
    setOpen(value);
  };

  return (
    <Box key={`service-${id}`} className={classes.boxService}>
      <Box
        key="title"
        flexDirection="row"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <AttachMoney className={classes.iconService} />
        <Typography
          key="title"
          className={
            status === 'rejected'
              ? classes.titleServiceDisabled
              : classes.titleService
          }
          noWrap
        >
          {s}:
        </Typography>
        <Box flexGrow={1} />
        <Typography
          key="price"
          className={
            status === 'rejected'
              ? classes.titleServiceDisabled
              : classes.titleService
          }
          noWrap
        >
          <b>$</b> {totalPrice.toFixed(2)}
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
        <Box
          key="item"
          flexDirection="row"
          display="flex"
          alignItems="center"
          className={classes.itemService}
        >
          {Object.keys(amtServices > 1) &&
            status !== 'locked' &&
            (status === 'rejected' ? (
              <Button
                className={classes.rejectBtn}
                onClick={async () => {
                  const data = {
                    estimate_service: {
                      status: 'approved',
                    },
                  };
                  updateEstimateServiceStatus(id, data).then(() => {
                    dispatch(estimateItemStatus(s, 'approved'));
                    handleCollapseBlock(false);
                    onRemoveOrAdd(totalPrice, true);
                  });
                }}
              >
                <RadioButtonUncheckedRounded
                  className={classes.iconServiceItemInactive}
                />
              </Button>
            ) : (
              <Button
                className={classes.rejectBtn}
                onClick={async () => {
                  const data = {
                    estimate_service: {
                      status: 'rejected',
                    },
                  };
                  updateEstimateServiceStatus(id, data).then(() => {
                    dispatch(estimateItemStatus(s, 'rejected'));
                    handleCollapseBlock(false);
                    onRemoveOrAdd(totalPrice, false);
                  });
                }}
              >
                <RemoveCircle className={classes.iconServiceItem} />
              </Button>
            ))}
          <Box key="content" className={classes.itemContent}>
            <Typography className={classes.itemTitle}>{s}</Typography>
            <List>
              {parts.map((part: IPart) => (
                <ListItem key={part.id}>• {part.name}</ListItem>
              ))}
            </List>
          </Box>
        </Box>
      )}
      {open && (
        <Box key="price" className={classes.boxPrice}>
          {partsPrice > 0 && (
            <Typography key="price-total">
              <b>Total Parts: $</b> <span>{partsPrice}</span>
            </Typography>
          )}
          <Typography key="price-labor">
            <b>Labor: $</b> <span>{laborPrice}</span>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ServiceItem;
