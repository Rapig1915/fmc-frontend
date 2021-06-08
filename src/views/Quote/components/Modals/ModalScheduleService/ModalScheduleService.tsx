import React, { ReactElement, useContext } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  ButtonForward,
  InputWithStatus,
  SelectWithStatus,
} from 'src/components/atoms';
import {
  ArrowBackIos,
  CalendarToday,
  Close,
  DirectionsCar,
  LocationOn,
} from '@material-ui/icons';
import { DatePicker } from '@material-ui/pickers';

import moment from 'moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { QuoteContext } from 'src/views/Quote/QuoteContext';
import { ResponseAvailability } from 'src/types';
import { carLocations } from 'src/utils/data';
import { IReduxState } from 'src/store/reducers';
import { checkAvailability } from 'src/api/quote';

interface ModalScheduleServiceProps {
  show: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-track': {},
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#79739C',
      outline: 0,
      borderRadius: 3.5,
    },
  },
  root: {
    minWidth: 700,
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  title: {
    margin: 0,
    textAlign: 'center',
    padding: theme.spacing(4),
    '& .title-icon': {
      color: '#C5C9DE',
    },
  },
  titleText: {
    color: '#2A2D3C',
    fontSize: 23,
    lineHeight: '24px',
    fontWeight: 900,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  buttonGroupBack: {
    position: 'absolute',
    left: theme.spacing(2),
    top: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    [theme.breakpoints.down('xs')]: {
      '& .title-button': {
        display: 'none',
      },
    },
  },

  actionContainer: {
    width: '100%',
    textAlign: 'right',
  },

  titleDatetime: {
    fontWeight: 900,
    fontSize: 19,
    lineHeight: '22.8px',
    marginLeft: theme.spacing(1),
  },
  boxDateTime: {
    width: '100%',
    background: '#EBF1FA',
    borderRadius: 6,
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      background: 'transparent',
      borderRadius: 0,
      padding: 0,
    },
  },

  boxLocation: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    '& > div': {
      flexGrow: 1,
    },
  },

  containerDatepicker: {
    borderRadius: 5,
  },
  containerTimeSlots: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 310,
    overflowY: 'scroll',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
  },
  itemTimeSlot: {
    cursor: 'pointer',
    background: theme.palette.common.white,
    marginBottom: theme.spacing(0.5),
    borderRadius: 6,
    padding: theme.spacing(1.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 500,
    color: '#7E7A92',
    border: '1px solid #FFFFFF',

    '&.selected': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
    },

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      fontSize: 15,
    },

    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0.3),
      width: '45%',
      flexGrow: 1,
    },
  },
}));

const ModalScheduleService = (
  props: ModalScheduleServiceProps
): ReactElement => {
  const { show, onClose } = props;
  const classes = useStyles();

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true,
  });
  const { handleUpdateAppointmentTime } = useContext(QuoteContext);

  const appointmentId = useSelector(
    (state: IReduxState) => state.quote.appointment?.id
  );

  const [date, changeDate] = React.useState<MaterialUiPickersDate>(moment());

  const [timeSlots, setTimeSlots] = React.useState<{ [dt: string]: string[] }>(
    {}
  );

  const keyDate = (date && date.format('YYYY-MM-DD')) || '';

  const timeSlotsToday = (timeSlots && timeSlots[keyDate]) || [];

  const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = React.useState(0);

  const [location, setLocation] = React.useState({
    type_of_site: '',
    exact_address: '',
    description: '',
  });

  const isReadyToSchedule =
    timeSlotsToday &&
    timeSlotsToday[selectedTimeSlotIndex] &&
    location.type_of_site &&
    location.exact_address &&
    location.description;

  React.useEffect(() => {
    const timer = setTimeout(async () => {
      if (!appointmentId) return;

      const resp: ResponseAvailability = await checkAvailability(appointmentId);

      if (!resp || !resp.data) {
        return;
      }

      setTimeSlots(resp.data.attributes.availability);
    });

    return () => {
      clearTimeout(timer);
    };
  }, [appointmentId]);

  const handleSchedule = () => {
    if (isReadyToSchedule) {
      handleUpdateAppointmentTime({
        appointment_day: keyDate,
        appointment_time: timeSlotsToday[selectedTimeSlotIndex],
        hints_to_find: location.description,
        exact_address: location.exact_address,
      });
    }
  };

  const handleChangeDate = (newDate: MaterialUiPickersDate) => {
    changeDate(newDate);
  };

  const handleLocationInputChange = (key: string, value: string) => {
    setLocation({
      ...location,
      [key]: value,
    });
  };

  const optionCarLocations = carLocations.reduce((obj, x) => {
    return {
      ...obj,
      [x]: x,
    };
  }, {});

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
    >
      <DialogTitle className={classes.title}>
        <Box className={classes.buttonGroupBack}>
          <ArrowBackIos className="title-icon" />
        </Box>
        <Typography className={classes.titleText}>Schedule service</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.root}>
        <Box key="pick-date-time-title" flexDirection="row" display="flex">
          <CalendarToday color="primary" />
          <Typography className={classes.titleDatetime} noWrap>
            Pick a date & time
          </Typography>
        </Box>
        <Box key="pick-date-time" className={classes.boxDateTime}>
          <Grid container spacing={2}>
            <Grid
              item
              sm={9}
              md={8}
              xs={12}
              className={classes.containerDatepicker}
            >
              <DatePicker
                orientation={isSm ? 'portrait' : 'landscape'}
                variant="static"
                openTo="date"
                value={date}
                onChange={handleChangeDate}
              />
            </Grid>
            <Grid
              item
              sm={3}
              md={4}
              xs={12}
              className={classes.containerTimeSlots}
            >
              {timeSlotsToday.map((tm, index) => (
                <Box
                  key={`tm-${tm}`}
                  className={clsx(
                    classes.itemTimeSlot,
                    index === selectedTimeSlotIndex && 'selected'
                  )}
                  onClick={() => setSelectedTimeSlotIndex(index)}
                >
                  {tm}
                </Box>
              ))}
            </Grid>
          </Grid>
        </Box>
        <Box key="pick-location-title" flexDirection="row" display="flex">
          <LocationOn color="primary" />
          <Typography className={classes.titleDatetime} noWrap>
            Your location
          </Typography>
        </Box>
        <Box key="pick-location" className={classes.boxDateTime}>
          <Box key="location-info-1" className={classes.boxLocation}>
            <SelectWithStatus
              start={<LocationOn color="secondary" />}
              items={optionCarLocations}
              label="Your car Location"
              value={location.type_of_site}
              valueChanged={(val: string) =>
                handleLocationInputChange('type_of_site', val)
              }
            />
            <InputWithStatus
              start={<DirectionsCar color="secondary" />}
              placeholder="Address where your car is"
              value={location.exact_address}
              valueChanged={(val: string) =>
                handleLocationInputChange('exact_address', val)
              }
            />
          </Box>
          <Box key="location-info-2" className={classes.boxLocation}>
            <InputWithStatus
              placeholder="Describe your car and location"
              value={location.description}
              valueChanged={(val: string) =>
                handleLocationInputChange('description', val)
              }
              multiline
            />
          </Box>
        </Box>
        <DialogActions className={classes.actionContainer}>
          <ButtonForward
            key="schedule-service"
            title="Schedule service"
            size="large"
            rounded
            onClickHandler={handleSchedule}
            disabled={!isReadyToSchedule}
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

ModalScheduleService.defaultProps = {};

export default ModalScheduleService;
