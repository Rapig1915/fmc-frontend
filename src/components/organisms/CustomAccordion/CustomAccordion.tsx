import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  withStyles,
} from '@material-ui/core';

export const MyAccordion = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    border: '1px solid #DBE8FD',
    minWidth: 350,
    borderRadius: 6,
    boxShadow: 'none',
    '&:not(:last-child)': {},
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },

    [theme.breakpoints.down('xs')]: {
      minWidth: 200,
    },
  },
  expanded: {},
}))(Accordion);

export const MyAccordionSummary = withStyles({
  root: {
    backgroundColor: '#EBF1FA',
    color: '#79739C',
    borderBottom: '1px solid #EBF1FA',
    borderRadius: 6,
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    '&$expanded': {
      margin: '12px 0',
    },

    fontSize: 19,
    lineHeight: '28px',
    fontWeight: 'bold',
  },
  expanded: {},
})(AccordionSummary);

export const MyAccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(AccordionDetails);
