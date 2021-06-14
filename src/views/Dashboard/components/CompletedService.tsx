import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { IReduxState } from 'src/store/reducers';
import ItemQuote from './ItemQuote';

interface CompletedServiceProps {
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    borderRadius: 9,
    background: '#F4F7FC',
    overflowY: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(-1),
    },
  },
  title: {
    color: '#2A2D3C',
    fontSize: 17,
    lineHeight: '20.4px',
    fontWeight: 800,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 300,
    maxHeight: 400,
  },
}));

const CompletedService = (props: CompletedServiceProps): ReactElement => {
  const { className } = props;

  const classes = useStyles();

  const quotes = useSelector(
    (state: IReduxState) => state.auth.appointments
  ).filter((x) => x.attributes.status === 'complete');

  const renderQuotes = () => {
    return quotes.map((q) => <ItemQuote key={q.id} data={q} miniMode />);
  };

  return (
    <Box className={clsx('dashboard-pending-quotes', classes.root, className)}>
      <Typography className={classes.title}>Completed Service</Typography>
      <Box className={classes.content}>{renderQuotes()}</Box>
    </Box>
  );
};

CompletedService.defaultProps = {
  className: undefined,
};

export default CompletedService;
