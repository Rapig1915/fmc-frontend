import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { ButtonGetQuote } from 'src/components/atoms';
import { makeStyles } from '@material-ui/core';
import { CustomTheme } from 'src/themes';

interface ZipcodeQuoteProps {
  className?: string;
}

const useStyles = makeStyles((theme: CustomTheme) => ({
  root: {
    borderRadius: '31px',
    width: '400px',
    height: '45px',
    display: 'flex',
    flexDirection: 'row',
    background: '#ECE9F1',
    paddingLeft: '20px',
  },
  inputZip: {
    flexGrow: 1,
    width: '200px',
    height: '100%',
    color: '#A2A1A8',
    fontFamily: 'Artegra Sans',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '25px',
    letterSpacing: '0px',
    textAlign: 'left',
    background: 'transparent',
    border: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
  buttonQuote: {
    minWidth: '150px',
    height: '100%',
    borderRadius: '31px',
  },
}));

/**
 * Component to get quote using zip code
 *
 * @param {ZipcodeQuoteProps} props
 */
const ZipcodeQuote = (props: ZipcodeQuoteProps): ReactElement => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <input className={classes.inputZip} placeholder="Zip code" />
      <ButtonGetQuote rounded size="medium" className={classes.buttonQuote} />
    </div>
  );
};

ZipcodeQuote.defaultProps = {
  className: undefined,
};

export default ZipcodeQuote;
