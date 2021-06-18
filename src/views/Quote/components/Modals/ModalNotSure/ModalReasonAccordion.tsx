import React, { ReactElement } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  Typography,
} from '@material-ui/core';
import { listNotSureReasons } from 'src/utils/data';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'src/components/organisms';

interface ModalReasonAccordionProps {
  reasonId: number;
  subReason: string[];
  onChange: (id: number, reason: string, subReason: string[]) => void;
}

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
    textAlign: 'center',
    padding: theme.spacing(4),
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

  reasonTitle: {
    fontSize: 18,
    lineHeight: '21px',
    fontWeight: 600,
    color: '#79739C',
  },

  actionContainer: {
    padding: theme.spacing(2),
  },
}));

const ModalReasonAccordion = (
  props: ModalReasonAccordionProps
): ReactElement => {
  const { reasonId, subReason, onChange } = props;

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState<number | false>(1);
  const handleChange = (panel: number) => (
    event: React.ChangeEvent<unknown>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  // const handleSubReasonSelect = (
  //   rId: number,
  //   r: string,
  //   evt: ChangeEvent<{ value: string }>
  // ) => {
  //   const v = evt.target.value as string;
  //   onChange(rId, r, v);
  // };

  const handleClickSubreason = _.debounce(
    (rId: number, r: string, value: string) => {
      if (value === 'Other') onChange(rId, r, [value]);
      else {
        const newSubReason = rId === reasonId ? subReason : [];

        if (newSubReason.includes('Other'))
          newSubReason.splice(newSubReason.indexOf('Other'));

        if (newSubReason.includes(value))
          newSubReason.splice(newSubReason.indexOf(value));
        else newSubReason.push(value);
        onChange(rId, r, newSubReason);
      }
    }
  );

  return (
    <Box>
      {listNotSureReasons &&
        listNotSureReasons.map((x) => (
          <Accordion
            key={`reason-${x.id}`}
            square
            expanded={expanded === x.id}
            onChange={handleChange(x.id)}
          >
            <AccordionSummary
              aria-controls={`content-${x.id}`}
              id={`header-${x.id}`}
            >
              <Typography className={classes.reasonTitle}>{x.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                {/* <RadioGroup
                  aria-multiselectable
                  aria-label="gender"
                  name={`reason-${x.id}`}
                  value={x.id === reasonId ? subReason : ''}
                  onChange={(evt) => handleSubReasonSelect(x.id, x.title, evt)}
                > */}
                {x.subReason.map((r) => (
                  <FormControlLabel
                    key={r}
                    value={r}
                    control={<Radio />}
                    label={r}
                    checked={x.id === reasonId && subReason.includes(r)}
                    onClick={() => handleClickSubreason(x.id, x.title, r)}
                  />
                ))}
                <FormControlLabel
                  value="Other"
                  key="Other"
                  control={<Radio />}
                  label="Other"
                  checked={x.id === reasonId && subReason.includes('Other')}
                  onClick={() => handleClickSubreason(x.id, x.title, 'Other')}
                />
                {/* </RadioGroup> */}
              </FormControl>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};

export default ModalReasonAccordion;
