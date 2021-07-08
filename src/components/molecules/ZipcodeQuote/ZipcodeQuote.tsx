import React, { ChangeEvent, ReactElement, useState } from 'react';
import clsx from 'clsx';
import { ButtonForward } from 'src/components/atoms';
import { makeStyles, Typography } from '@material-ui/core';
import { getHappyCustomer } from 'src/api/quote';

interface ZipcodeQuoteProps {
  className?: string;
  onGetQuote?: (payload: { zip?: string; customer?: number }) => void;
}

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: 31,
    minWidth: 300,
    height: '45px',
    background: '#ECE9F1',
    paddingLeft: '20px',
    position: 'relative',
    overflowY: 'visible',
  },
  inputZip: {
    flexGrow: 1,
    maxWidth: 150,
    minWidth: 100,
    height: '100%',
    color: '#A2A1A8',
    fontFamily: 'Alegreya Sans',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 25,
    letterSpacing: 2,
    textAlign: 'left',
    background: 'transparent',
    border: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
  ButtonForward: {
    width: 150,
    height: '100%',
    borderRadius: 31,
    position: 'absolute',
    right: 0,
  },
  customer: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '22px',
    position: 'absolute',
    top: '100%',
  },
}));

const ZipcodeQuote = ({
  className,
  onGetQuote,
  ...rest
}: ZipcodeQuoteProps): ReactElement => {
  const classes = useStyles();

  const [customer, setCustomer] = useState(0);
  const [notExpanded, setNotExpanded] = useState(false);
  const [zip, setZip] = useState('');

  const [processing, setProcessing] = useState(false);

  const isReadyToQuote = !!zip && !!customer;

  const handleChange = async (evt: ChangeEvent<{ value: string }>) => {
    const code = evt.target.value as string;
    setZip(code);

    setProcessing(true);
    if (code.length === 5) {
      try {
        const happyCustomer = await getHappyCustomer(code);
        setCustomer((happyCustomer && happyCustomer['times-used']) || 0);
      } catch (err) {
        setCustomer(0);
        setNotExpanded(true);
      }
    } else {
      setCustomer(0);
    }
    setProcessing(false);
  };

  const handleGetQuote = () => {
    if (zip && onGetQuote) {
      onGetQuote({ zip, customer });
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <input
        className={classes.inputZip}
        placeholder="Zip code"
        value={zip}
        onChange={handleChange}
      />
      <ButtonForward
        rounded
        size="medium"
        className={classes.ButtonForward}
        onClickHandler={handleGetQuote}
        disabled={!isReadyToQuote}
        processing={processing}
      />
      {!!zip && notExpanded && customer === 0 && (
        <Typography className={classes.customer}>
          Sorry, we have not expanded to your area yet.
        </Typography>
      )}
    </div>
  );
};

ZipcodeQuote.defaultProps = {
  className: undefined,
  onGetQuote: undefined,
};

export default ZipcodeQuote;
