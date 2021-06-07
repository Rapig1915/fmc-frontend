import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from '@material-ui/core';
import { InputWithStatus } from 'src/components/atoms';

const useStyles = makeStyles((theme) => ({
  imgCandidate: {
    width: 100,
    height: 100,
    marginRight: theme.spacing(3),
  },
  countReview: {
    fontWeight: 500,
    fontStyle: 'italic',
    fontSize: '15px',
    lineHeight: '20.75px',
    textAlign: 'center',
    color: '#7157FF',
  },
  nameCandidate: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    fontWeight: 800,
    fontSize: 20,
    lineHeight: '29px',
    color: '#2A2D3C',
  },
  containerMention: {
    width: '100%',
    fontWeight: 500,
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: '40.86px',
    '& svg': {
      color: '#36D9A0',
      marginRight: '10px',
    },
  },

  itemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: theme.spacing(1),
  },
  itemNo: {
    background: '#36D9A0',
    width: 40,
    height: 40,
    borderRadius: 40,
    fontSize: 20,
    lineHeight: '27px',
    fontWeight: 400,
    color: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
  itemContent: {
    flexGrow: 1,
    paddingRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    minHeight: 100,
  },
  query: {},
  answer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    '& > div': {
      flexGrow: 1,
    },

    '& .radio-box': {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },

    '& .slider': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      minHeight: 90,
      margin: 0,
      marginBottom: theme.spacing(-2),
    },
  },
}));

const HelperQuestions = (props: { className: string }): ReactElement => {
  const { className } = props;

  const classes = useStyles();

  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 12,
      label: '12',
    },
    {
      value: 24,
      label: '24',
    },
  ];

  return (
    <Box className={className}>
      <Box key="q-1" className={classes.itemContainer}>
        <Typography className={classes.itemNo}>1</Typography>
        <Box className={classes.itemContent}>
          <Typography className={classes.query}>
            When was the last time the batery was replaced?
          </Typography>
          <Box className={classes.answer}>
            <RadioGroup
              aria-label="r-q-1"
              name="r-q-1"
              value="1"
              className="radio-box"
            >
              <FormControlLabel
                value="1"
                key="1"
                control={<Radio />}
                label="4 months ago"
              />
              <FormControlLabel
                value="2"
                key="2"
                control={<Radio />}
                label="8 months ago"
              />
            </RadioGroup>
          </Box>
        </Box>
      </Box>

      <Box key="q-2" className={classes.itemContainer}>
        <Typography className={classes.itemNo}>2</Typography>
        <Box className={classes.itemContent}>
          <Typography className={classes.query}>
            Your last time at a repair shop was __ months ago?
          </Typography>
          <Box className={classes.answer}>
            <Slider
              className="slider"
              defaultValue={6}
              aria-labelledby="discrete-slider-always"
              step={1}
              min={1}
              max={24}
              marks={marks}
              valueLabelDisplay="on"
            />
          </Box>
        </Box>
      </Box>

      <Box key="q-3" className={classes.itemContainer}>
        <Typography className={classes.itemNo}>3</Typography>
        <Box className={classes.itemContent}>
          <Typography className={classes.query}>
            Does your car rattle when you start?
          </Typography>
          <Box className={classes.answer}>
            <InputWithStatus
              placeholder="Describe your car and location"
              multiline
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HelperQuestions;
