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
import mixPanel from 'src/utils/mixpanel';
import { MIXPANEL_TRACK } from 'src/utils/consts';
import { IQuoteReasonSelection } from 'src/views/Quote/QuoteContext';
import { Check } from '@material-ui/icons';

interface ModalReasonAccordionProps {
  selection: IQuoteReasonSelection;
  onChange: (newSelection: IQuoteReasonSelection) => void;
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
  const { selection, onChange } = props;

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState<number | false>(0);
  const handleChange = (panel: number) => (
    event: React.ChangeEvent<unknown>,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClickSubreason = _.debounce((r: string, value: string) => {
    const newSubReason = selection[r] || [];

    if (newSubReason.includes(value))
      newSubReason.splice(newSubReason.indexOf(value), 1);
    else newSubReason.push(value);

    onChange({
      ...selection,
      [r]: newSubReason.length > 0 ? newSubReason : undefined,
    });
  });

  React.useEffect(() => {
    mixPanel(MIXPANEL_TRACK.NOT_SURE_WHATS_WRONG_CATEGORY);
  });

  const isReasonChecked = (
    reasonTitle: string,
    subReasonTitle: string
  ): boolean => {
    if (!selection[reasonTitle]) return false;
    const selectedSubReason = selection[reasonTitle] || [];
    return selectedSubReason.includes(subReasonTitle) || false;
  };

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
              {selection[x.title] && <Check />}
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                {x.subReason.map((r) => (
                  <FormControlLabel
                    key={r}
                    value={r}
                    control={<Radio />}
                    label={r}
                    checked={isReasonChecked(x.title, r)}
                    onClick={() => handleClickSubreason(x.title, r)}
                  />
                ))}
                <FormControlLabel
                  value="Other"
                  key="Other"
                  control={<Radio />}
                  label="Other"
                  checked={isReasonChecked(x.title, 'Other')}
                  onClick={() => handleClickSubreason(x.title, 'Other')}
                />
              </FormControl>
            </AccordionDetails>
          </Accordion>
        ))}
    </Box>
  );
};

export default ModalReasonAccordion;
