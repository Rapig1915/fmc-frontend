import React, { ReactElement, useContext } from 'react';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  Typography,
} from '@material-ui/core';
import { staticServiceList } from 'src/utils/data';
import { QuoteContext } from 'src/views/Quote/QuoteContext';
import { ButtonForward, InputWithStatus } from 'src/components/atoms';
import { Close, Search } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
    textAlign: 'center',
    padding: theme.spacing(4),

    '& .hidden': {
      display: 'none',
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

  reasonTitle: {
    fontSize: 18,
    lineHeight: '21px',
    fontWeight: 600,
    color: '#79739C',
  },

  actionContainer: {
    padding: theme.spacing(2),
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
  },

  services: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 500,
    overflowY: 'scroll',

    [theme.breakpoints.down('xs')]: {
      maxHeight: 300,
    },

    item: {
      flex: 1,
    },
  },
}));

interface ModalSelectStaticServiceProps {
  show: boolean;
  onClose: () => void;
}

const ModalSelectStaticService = (
  props: ModalSelectStaticServiceProps
): ReactElement => {
  const { show, onClose } = props;

  const classes = useStyles();

  const { staticServices, handleSetStaticServices } = useContext(QuoteContext);

  const [filter, setFilter] = React.useState('');
  const [display, setDisplay] = React.useState(0);

  const handleClickService = _.debounce((value: string) => {
    const newServices = staticServices;
    if (staticServices.includes(value))
      newServices.splice(staticServices.indexOf(value), 1);
    else newServices.push(value);
    handleSetStaticServices(newServices);
    setDisplay(display + 1);
  });

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
    >
      <DialogTitle className={classes.title}>
        <Typography className="hidden">{display}</Typography>
        <Typography className={classes.titleText}>
          Search for service
        </Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <InputWithStatus
          start={<Search />}
          placeholder="Search for service..."
          value={filter}
          valueChanged={(val: string) => setFilter(val)}
        />
        <FormControl component="fieldset" className={classes.services}>
          {staticServiceList
            .filter((x) => x.toLowerCase().includes(filter.toLowerCase()))
            .map((r) => (
              <FormControlLabel
                className="item"
                key={r}
                value={r}
                control={<Radio />}
                label={r}
                checked={staticServices.includes(r)}
                onClick={() => handleClickService(r)}
              />
            ))}
        </FormControl>
      </DialogContent>

      <DialogActions className={classes.actionContainer}>
        <ButtonForward
          key="button-continue"
          title="Close"
          size="large"
          rounded
          noIcon
          onClickHandler={onClose}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ModalSelectStaticService;
