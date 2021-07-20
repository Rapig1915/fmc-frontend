import React, { ReactElement, useContext, useEffect, useState } from 'react';
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
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {
  ButtonForward,
  GoogleAddressInputWithStatus,
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

import moment from 'moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { QuoteContext } from 'src/views/Quote/QuoteContext';
import { QuoteShowModal, ResponseAvailability } from 'src/types';
import { carLocations } from 'src/utils/data';
import { IReduxState } from 'src/store/reducers';
import { checkAvailability } from 'src/api/quote';
import mixPanel from 'src/utils/mixpanel';
import { MIXPANEL_TRACK } from 'src/utils/consts';
import useDeviseQuery from 'src/hooks/useDeviseQuery';
import MDatePicker from 'src/components/atoms/DatePicker';

interface ModalScheduleServiceProps {
  show: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'hidden',

    '& .MuiDialog-paper': {
      '@media only screen and (max-width: 375px)': {
        margin: 10,
      },
      '@media only screen and (max-width: 320px)': {
        maxWidth: 'calc(100%)',
        margin: 0,
        borderRadius: 0,

        '& .icon-label-start': {
          marginLeft: 10,
        },
      },
    },
  },
  content: {
    minWidth: 700,
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 200,
    },

    '@media only screen and (max-width: 375px)': {
      padding: 10,
    },
    '@media only screen and (max-width: 320px)': {
      padding: 0,
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
    cursor: 'pointer',

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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    '& .MuiPickersBasePicker-container': {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  containerTimeSlots: {
    margin: 0,
    marginBottom: theme.spacing(1),
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

    background: theme.palette.common.white,

    '&.selected': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
    },

    [theme.breakpoints.down('sm')]: {
      fontSize: 15,
    },

    [theme.breakpoints.down('xs')]: {
      background: '#F0F0F0',
      margin: theme.spacing(0.5),
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

  const {
    handleUpdateAppointment,
    handleRespondAppointmentEstimate,
    isEstimateResponse,
    shouldBookEstimate,
    handleShowModal,
    requestInProgress,
  } = useContext(QuoteContext);

  const appointmentId = useSelector(
    (state: IReduxState) => state.quote.appointment?.id
  );

  const [date, changeDate] = useState<MaterialUiPickersDate>(moment());

  const [timeSlots, setTimeSlots] = useState<{ [dt: string]: string[] }>({});

  const keyDate = (date && date.format('YYYY-MM-DD')) || '';

  const timeSlotsToday = (timeSlots && timeSlots[keyDate]) || [];

  const [selectedTimeSlotIndex, setSelectedTimeSlotIndex] = useState(0);

  const [location, setLocation] = useState({
    type_of_site: '',
    exact_address: '',
    description: '',
  });

  const isReadyToSchedule =
    timeSlotsToday &&
    timeSlotsToday[selectedTimeSlotIndex] &&
    ((isEstimateResponse && !shouldBookEstimate) ||
      (location.type_of_site &&
        location.exact_address &&
        location.description));

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!appointmentId) return;

      const resp: ResponseAvailability = await checkAvailability(appointmentId);

      if (!resp || !resp.data) {
        return;
      }

      setTimeSlots(resp.data.attributes.availability);
      const timeSlotEntries = Object.entries(resp.data.attributes.availability);
      if (timeSlotEntries.length > 0 && timeSlotEntries[0].length > 0) {
        changeDate(moment(timeSlotEntries[0][0]));
      }
    });

    return () => {
      clearTimeout(timer);
    };
  }, [appointmentId]);

  const handleSchedule = () => {
    if (isReadyToSchedule) {
      mixPanel(MIXPANEL_TRACK.SCHEDULE_APPOINTMENT);

      if (isEstimateResponse && !shouldBookEstimate) {
        handleRespondAppointmentEstimate({
          appointment: {
            id: appointmentId,
            appointment_day: keyDate,
            appointment_time: timeSlotsToday[selectedTimeSlotIndex],
          },
        });
      } else {
        handleUpdateAppointment({
          kind: 'RequestUpdateAppointmentTime',
          appointment_day: keyDate,
          appointment_time: timeSlotsToday[selectedTimeSlotIndex],
          type_of_site: location.type_of_site,
          hints_to_find: location.description,
          exact_address: location.exact_address,
        });
      }
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

  const handleStepBack = () => {
    handleShowModal(QuoteShowModal.REVIEW_QUOTE);
  };

  const optionCarLocations = carLocations.reduce((obj, x) => {
    return {
      ...obj,
      [x]: x,
    };
  }, {});

  const isDateDisabled = (day: MaterialUiPickersDate): boolean => {
    return (
      ((timeSlots && timeSlots[day?.format('YYYY-MM-DD') || '']) || [])
        .length <= 0
    );
  };

  const { xsOnly } = useDeviseQuery();

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
      className={classes.root}
    >
      <DialogTitle className={classes.title}>
        <Box className={classes.buttonGroupBack}>
          <ArrowBackIos className="title-icon" onClick={handleStepBack} />
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
      <DialogContent className={classes.content}>
        <Box key="pick-date-time-title" flexDirection="row" display="flex">
          <CalendarToday color="primary" className="icon-label-start" />
          <Typography className={classes.titleDatetime} noWrap>
            {xsOnly ? 'Pick a date' : 'Pick a date & time'}
          </Typography>
        </Box>
        <Box key="pick-date-time" className={classes.boxDateTime}>
          <Grid container spacing={xsOnly ? 0 : 2}>
            <Grid
              item
              sm={9}
              md={6}
              xs={12}
              className={classes.containerDatepicker}
            >
              <MDatePicker
                date={date}
                shouldDisableDate={isDateDisabled}
                onChangeDate={handleChangeDate}
              />
            </Grid>
            {xsOnly && (
              <Grid item xs={12} className={classes.containerTimeSlots}>
                <Box
                  key="pick-date-time-title"
                  flexDirection="row"
                  display="flex"
                >
                  <CalendarToday color="primary" className="icon-label-start" />
                  <Typography className={classes.titleDatetime} noWrap>
                    Pick a time
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid
              item
              sm={3}
              md={6}
              xs={12}
              className={classes.containerTimeSlots}
            >
              {timeSlotsToday.length > 0 ? (
                timeSlotsToday.map((tm, index) => (
                  <Box
                    key={`tm-${tm}`}
                    className={clsx(
                      classes.itemTimeSlot,
                      index === selectedTimeSlotIndex && 'selected'
                    )}
                    onClick={() => setSelectedTimeSlotIndex(index)}
                  >
                    {tm.replaceAll(':00', '')}
                  </Box>
                ))
              ) : (
                <Box className="icon-label-start">
                  <Typography>No times available</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
        {(!isEstimateResponse || shouldBookEstimate) && (
          <Box key="pick-location-title" flexDirection="row" display="flex">
            <LocationOn color="primary" className="icon-label-start" />
            <Typography className={classes.titleDatetime} noWrap>
              Your location
            </Typography>
          </Box>
        )}
        {(!isEstimateResponse || shouldBookEstimate) && (
          <Box key="pick-location" className={classes.boxDateTime}>
            <Box key="location-info-1" className={classes.boxLocation}>
              <SelectWithStatus
                start={<LocationOn color="secondary" />}
                items={optionCarLocations}
                label="Your car location"
                value={location.type_of_site}
                valueChanged={(val: string) =>
                  handleLocationInputChange('type_of_site', val)
                }
              />
            </Box>
            <Box key="location-info-2" className={classes.boxLocation}>
              <GoogleAddressInputWithStatus
                start={<DirectionsCar color="secondary" />}
                value={location.exact_address}
                valueChanged={(val: string) =>
                  handleLocationInputChange('exact_address', val)
                }
              />
            </Box>
            <Box key="location-info-3" className={classes.boxLocation}>
              <InputWithStatus
                placeholder="Any hints to find your car?"
                value={location.description}
                valueChanged={(val: string) =>
                  handleLocationInputChange('description', val)
                }
                multiline
              />
            </Box>
          </Box>
        )}
        <DialogActions className={classes.actionContainer}>
          <ButtonForward
            key="schedule-service"
            title="Schedule service"
            size="large"
            rounded
            onClickHandler={handleSchedule}
            disabled={!isReadyToSchedule || requestInProgress}
            processing={requestInProgress}
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

ModalScheduleService.defaultProps = {};

export default ModalScheduleService;
