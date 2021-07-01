import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { IAppointment, ResponseGetUserAppointments } from 'src/types';
import { getUserAppointments } from 'src/api/auth';
import ItemQuote from './ItemQuote';

interface PendingQuotesProps {
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3),
    borderRadius: 9,
    background: '#F4F7FC',
    overflowY: 'auto',
    maxHeight: 360,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 300,
    maxHeight: 400,
  },
}));

const PendingQuotes = (props: PendingQuotesProps): ReactElement => {
  const { className } = props;

  const [appointments, setAppointments] = React.useState<IAppointment[]>([]);

  React.useEffect(() => {
    const timerId = setTimeout(async () => {
      const appointmentsResp: ResponseGetUserAppointments = await getUserAppointments(
        'pending'
      );
      setAppointments(appointmentsResp.data);
    });
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const classes = useStyles();

  const renderQuotes = () => {
    return appointments.map((q) => (
      <ItemQuote key={q.id} data={q} miniMode={false} />
    ));
  };

  return (
    <Box className={clsx('dashboard-pending-quotes', classes.root, className)}>
      <Typography className={classes.title}>Pending Quotes</Typography>
      <Box className={classes.content}>{renderQuotes()}</Box>
    </Box>
  );
};

PendingQuotes.defaultProps = {
  className: undefined,
};

export default PendingQuotes;
