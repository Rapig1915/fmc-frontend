import React, { ReactElement, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { RemoveCircleRounded } from '@material-ui/icons';
import { QuoteContext } from '../../QuoteContext';

interface ServiceSummaryProps {
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    width: 200,
    borderRadius: 9,
    background: '#2A2D3C',
  },

  title: {
    fontStyle: 'normal',
    fontWeight: 900,
    fontSize: 16,
    lineHeight: '20px',
    color: theme.palette.common.white,
    marginBottom: theme.spacing(1),
  },

  itemContainerService: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    margin: theme.spacing(0.5),
  },
  textService: {
    marginLeft: theme.spacing(1),
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '20px',
    color: '#D8D8D8',
  },
  iconService: {
    color: '#57FFC4',
    height: 20,
    width: 'auto',
    cursor: 'pointer',
  },
}));

const ServiceSummary = (props: ServiceSummaryProps): ReactElement => {
  const { className } = props;

  const classes = useStyles();

  const { services, handleSetServices } = useContext(QuoteContext);

  const handleRemoveService = (s: string) => {
    handleSetServices(services.filter((x) => x !== s));
  };

  return (
    <Box className={clsx('quote-summary-services', classes.root, className)}>
      <Typography className={classes.title}>Summary of services</Typography>
      {services.map((x) => (
        <Box key={`service-${x}`} className={classes.itemContainerService}>
          <RemoveCircleRounded
            className={classes.iconService}
            onClick={() => handleRemoveService(x)}
          />
          <Typography className={classes.textService}>{x}</Typography>
        </Box>
      ))}
    </Box>
  );
};

ServiceSummary.defaultProps = {
  className: undefined,
};

export default ServiceSummary;
