import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { IReduxState } from 'src/store/reducers';
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
    justifyContent: (props: { waiting: boolean }) =>
      props.waiting ? 'center' : 'flex-start',
    alignItems: 'center',
    minHeight: 300,
    maxHeight: 400,
  },
  containerWaiting: {
    width: 420,
    height: 180,
    background: theme.palette.common.white,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: 360,
    },
  },
  titleWaiting: {
    color: '#667296',
    fontSize: 25,
    lineHeight: '30px',
    fontWeight: 800,
  },
  checkWaiting: {
    color: '#667296',
    fontSize: 20,
    lineHeight: '24px',
    fontWeight: 400,
  },
  hoursWaiting: {
    color: '#36d9a0',
    fontSize: 45,
    lineHeight: '59.24px',
    fontWeight: 265,
    '& b': {
      color: '#4A37B1',
      fontSize: 50,
      lineHeight: '75.93px',
      fontWeight: 700,
    },
  },
}));

const PendingQuotes = (props: PendingQuotesProps): ReactElement => {
  const { className } = props;

  const [appointments, setAppointments] = React.useState<IAppointment[]>([]);

  const authToken = useSelector((state: IReduxState) => state.auth.token);

  React.useEffect(() => {
    const timerId = setTimeout(async () => {
      const appointmentsResp: ResponseGetUserAppointments = await getUserAppointments(
        authToken,
        'pending'
      );
      setAppointments(appointmentsResp.data);
    });
    return () => {
      clearTimeout(timerId);
    };
  }, [authToken]);

  const waiting = appointments.reduce(
    (flag, a) =>
      flag ||
      (a.attributes.appointment_type === 'repair' && !!a.attributes.estimate),
    false
  );

  const classes = useStyles({ waiting });

  const min = React.useMemo(
    () => (Math.random() * 40 + 10 + appointments.length).toFixed(0),
    [appointments]
  );

  const renderWaitingBox = () => {
    return (
      <Box className={classes.containerWaiting}>
        <Typography key="title" className={classes.titleWaiting}>
          We&apos;re working on your quote
        </Typography>
        <Typography key="notify" className={classes.checkWaiting}>
          Check back in:
        </Typography>
        <Typography key="hours" className={classes.hoursWaiting}>
          {/* <b>02</b> h &nbsp; */}
          <b>{min}</b> m &nbsp;
          {/* <b>45</b> s */}
        </Typography>
      </Box>
    );
  };

  const renderQuotes = () => {
    return appointments.map((q) => (
      <ItemQuote key={q.id} data={q} miniMode={false} />
    ));
  };

  return (
    <Box className={clsx('dashboard-pending-quotes', classes.root, className)}>
      <Typography className={classes.title}>Pending Quotes</Typography>
      <Box className={classes.content}>
        {waiting ? renderWaitingBox() : renderQuotes()}
      </Box>
    </Box>
  );
};

PendingQuotes.defaultProps = {
  className: undefined,
};

export default PendingQuotes;
