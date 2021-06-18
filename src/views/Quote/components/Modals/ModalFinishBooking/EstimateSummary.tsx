import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import {
  AttachMoney,
  KeyboardArrowDown,
  RemoveCircle,
} from '@material-ui/icons';
import { IReduxState } from 'src/store/reducers';
import { getEstimate } from 'src/api/quote';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: 0,
    // background: '#EBF1FA',
    // borderRadius: 6,
    // padding: theme.spacing(4),
    // marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    borderBottom: '1px solid #D8D8D8',

    [theme.breakpoints.down('xs')]: {},
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

    '& b': {
      color: '#24CA90',
    },
  },
  itemService: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
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
  },
  itemContent: {
    fontWeight: 400,
    fontSize: 18,
    lineHeight: '29px',
    color: '#7E7A92',
    paddingLeft: theme.spacing(2),
    flexGrow: 1,
    paddingBottom: theme.spacing(0.5),

    borderBottom: '1px dashed #D8D8D8',
  },

  boxPrice: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: theme.spacing(1),

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
        minWidth: 80,
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

  const appId = useSelector(
    (state: IReduxState) =>
      state.quote.appointment && state.quote.appointment.id
  );

  React.useEffect(() => {
    const timerId = setTimeout(async () => {
      await getEstimate(appId);
    }, 0);

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [appId]);

  return (
    <Box className={clsx(classes.root, className)}>
      <Box key="service-1" className={classes.boxService}>
        <Box
          key="title"
          flexDirection="row"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <AttachMoney className={classes.iconService} />
          <Typography key="title" className={classes.titleService} noWrap>
            Summary:
          </Typography>
          <Box flexGrow={1} />
          <Typography className={classes.titleService} noWrap>
            <b>$</b> 849.24 <KeyboardArrowDown />
          </Typography>
        </Box>
        <Box
          key="item"
          flexDirection="row"
          display="flex"
          alignItems="center"
          className={classes.itemService}
        >
          <RemoveCircle className={classes.iconServiceItem} />
          <Box key="content" className={classes.itemContent}>
            <Typography className={classes.itemTitle}>
              Replace both front struts with Quick_struts
            </Typography>
            <List>
              <ListItem>• Monroe Quick-Strut and Coil Spring Assembly</ListItem>
            </List>
          </Box>
        </Box>
        <Box key="price" className={classes.boxPrice}>
          <Typography>
            <b>Total Parts: $</b> <span>480.24</span>
          </Typography>
          <Typography>
            <b>Labor: $</b> <span>369.00</span>
          </Typography>
        </Box>
      </Box>
      <Box key="total" className={classes.boxTotal}>
        <Box key="title" flexDirection="row" display="flex" alignItems="center">
          <AttachMoney className={classes.iconService} />
          <Typography key="title" className={classes.titleService} noWrap>
            Total:
          </Typography>
          <Box flexGrow={1} />
          <Typography className={classes.titleService} noWrap>
            <b>$</b> 849.24 <KeyboardArrowDown />
          </Typography>
        </Box>
        <Box key="price" className={classes.boxPrice}>
          <Typography>
            <b>Services: $</b> <span>480.24</span>
          </Typography>
          <Typography>
            <b>Tax: $</b> <span>369.00</span>
          </Typography>
          <Typography>
            <b>Total Price (15% savings): $</b> <span>1104.55</span>
          </Typography>
          <Typography>
            <b>Shop price: $</b>{' '}
            <span>
              <del>1303.43</del>
            </span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

EstimateSummary.defaultProps = {
  className: undefined,
};

export default EstimateSummary;
