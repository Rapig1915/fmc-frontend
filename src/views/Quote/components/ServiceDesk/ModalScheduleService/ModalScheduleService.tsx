import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  DialogActions,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
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
import { carLocations } from 'src/utils/data';

interface ModalReviewQuoteProps {
  show: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 900,
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
}));

const ModalReviewQuote = (props: ModalReviewQuoteProps): ReactElement => {
  const { show, onClose } = props;
  const classes = useStyles();

  const optionCarLocations = carLocations.reduce((obj, x) => {
    return {
      ...obj,
      [x]: x,
    };
  }, {});

  const [date, setDate] = React.useState<Date | null>(new Date());

  const handleSchedule = () => {};

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
          Date time
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
            />
            <InputWithStatus
              start={<DirectionsCar color="secondary" />}
              placeholder="Address where your car is"
            />
          </Box>
          <Box key="location-info-2" className={classes.boxLocation}>
            <InputWithStatus
              placeholder="Describe your car and location"
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
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

ModalReviewQuote.defaultProps = {};

export default ModalReviewQuote;
