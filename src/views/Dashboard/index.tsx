import React, { ReactElement, useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Add, ArrowForward } from '@material-ui/icons';
import { ButtonForward, Image } from 'src/components/atoms';
import { URL } from 'src/utils/consts';
import useDeviseQuery from 'src/hooks/useDeviseQuery';
import { TabSelector } from 'src/components/molecules';
import { IReduxState } from 'src/store/reducers';
import { getUser, getUserAppointments } from 'src/api/auth';
import { ResponseGetUser, ResponseGetUserAppointments } from 'src/types';
import { setUser, setUserAppintments } from 'src/store/actions';

import ImageMechanic from 'src/assets/candidates/steven.png';
import SvgGift from 'src/assets/badges/gift.svg';
import logger from 'src/utils/logger';

import { ServiceIntro } from '../Quote/components';
import HighFive from './components/HighFive';
import PendingQuotes from './components/PendingQuotes';
import CompletedService from './components/CompletedService';
import { ModalServiceIntro } from '../Quote/components/Modals';

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: 8,
    },
    '*::-webkit-scrollbar-track': {},
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#A2A1A8',
      outline: 0,
      borderRadius: 8,
    },
  },
  root: {
    '& .grid': {
      '& .content-1': {
        display: 'flex',
        flexDirection: 'column',
      },
      '& .content-2': {
        display: 'flex',
        flexDirection: 'column',

        '& .content-last': {
          flexGrow: 1,
        },
      },
    },
  },
  spacer: {
    background: 'transparent',
    minHeight: theme.spacing(1),
    minWidth: theme.spacing(1),
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  button: {
    flexGrow: 1,
    background: '#302A3C',
    borderRadius: 9,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(5),
    fontSize: 17,
    lineHeight: '27px',
    fontWeight: 700,
    color: theme.palette.common.white,
    textTransform: 'none',

    '&:hover': {
      background: 'rgba(0, 0, 0, 0.5)',
    },

    '& .MuiButton-label': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
  },
  imageMechanic: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: theme.spacing(1),
  },
  iconAdd: {
    color: '#302A3C',
    background: theme.palette.common.white,
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: theme.spacing(1),
  },

  engineHealth: {
    borderRadius: 9,
    background: '#F4F7FC',
    minWidth: '50%',
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'relative',

    '& .title': {
      position: 'absolute',
      top: theme.spacing(3),
      left: theme.spacing(3),
      color: '#2A2D3C',
      fontSize: 17,
      lineHeight: '20.4px',
      fontWeight: 800,
    },

    '& .arrow': {
      width: 154,
      height: 154,
      borderRadius: 154,
      color: theme.palette.common.white,
      background: '#57FFC4',
      padding: theme.spacing(5),
      boxShadow: '0px 0px 0px 10px #d4f9f1',
      cursor: 'pointer',

      '&:hover': {
        boxShadow: '0px 0px 0px 15px #d4ffff',
      },
    },
  },

  actionContainer: {
    width: '100%',
    minHeight: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end',
    },

    '& .button-mobile-info': {
      width: 45,
      height: 45,
    },
  },
  buttonSchedleService: {
    float: 'right',
  },
}));

const Dashboard = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state: IReduxState) => state.auth.loggedIn);
  const authToken = useSelector((state: IReduxState) => state.auth.token);

  if (!loggedIn) {
    history.push(URL.LOGIN);
  }

  const classes = useStyles();
  const { xsOnly } = useDeviseQuery();

  useEffect(() => {
    const timerId = setTimeout(async () => {
      const userResp: ResponseGetUser = await getUser(authToken);
      if (userResp && userResp.data) {
        dispatch(setUser(userResp.data));
      }

      const appointmentsResp: ResponseGetUserAppointments = await getUserAppointments(
        authToken,
        'past'
      );
      if (appointmentsResp && appointmentsResp.data) {
        dispatch(setUserAppintments(appointmentsResp.data));
      }
    });
    return () => {
      clearTimeout(timerId);
    };
  }, [authToken, dispatch]);

  const handleHealthClick = () => {
    history.push(URL.HOME);
  };

  const [tab, setTab] = React.useState('pending');

  const options = { pending: 'pending', completed: 'completed' };
  const onTabSelected = (state: string) => {
    setTab(state);
  };

  const [showIntro, setShowIntro] = React.useState(false);

  const handleShowIntro = () => {
    setShowIntro(true);
  };

  const handleScheduleService = () => {
    logger.log('schedule service');
  };

  const handleNewServiceRequest = () => {
    history.push(URL.QUOTE);
  };

  return (
    <Container className={classes.root}>
      <Grid container spacing={1} className="grid">
        <Hidden xsDown>
          <Grid item sm={3} xs={12} className="content-1">
            <ServiceIntro rounded withLink={false} />
            <Box className={classes.spacer} />
            <HighFive />
          </Grid>
        </Hidden>
        <Grid item sm={9} xs={12} className="content-2">
          <Box key="box-buttons" className={classes.buttonGroup}>
            <Button
              key="button-new-service-request"
              startIcon={<Add className={classes.iconAdd} />}
              className={classes.button}
              onClick={handleNewServiceRequest}
            >
              New service request
            </Button>
            <Box key="spacer" className={classes.spacer} />
            <Button
              key="button-book-again"
              startIcon={
                <Image
                  lazy={false}
                  className={classes.imageMechanic}
                  src={ImageMechanic}
                />
              }
              className={classes.button}
            >
              Book with John again
            </Button>
          </Box>
          <Box key="space-1" className={classes.spacer} />
          <Hidden smUp>
            <TabSelector
              items={options}
              onTabSelected={onTabSelected}
              selectedValue={tab}
            />
          </Hidden>
          {(!xsOnly || tab === 'pending') && <PendingQuotes />}
          <Box key="space-2" className={classes.spacer} />
          {(!xsOnly || tab === 'completed') && (
            <Box
              key="box-service"
              className={clsx(classes.buttonGroup, 'content-last')}
            >
              <CompletedService />
              <Hidden xsDown>
                <Box key="spacer" className={classes.spacer} />
                <Box key="engine-health" className={classes.engineHealth}>
                  <Typography className="title">Your engine Health</Typography>
                  <ArrowForward
                    className="arrow"
                    onClick={() => handleHealthClick()}
                  />
                </Box>
              </Hidden>
            </Box>
          )}
        </Grid>
      </Grid>
      <Hidden smUp>
        <Box className={classes.actionContainer}>
          <Box onClick={handleShowIntro}>
            <Image src={SvgGift} lazy={false} className="button-mobile-info" />
          </Box>
          {tab === 'pending' && (
            <ButtonForward
              title="Schedule Service"
              rounded
              size="large"
              onClickHandler={handleScheduleService}
              className={classes.buttonSchedleService}
            />
          )}
        </Box>
      </Hidden>
      <ModalServiceIntro show={showIntro} onClose={() => setShowIntro(false)} />
    </Container>
  );
};

export default Dashboard;
