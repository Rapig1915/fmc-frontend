import React, { ReactElement, useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { ImageNode } from 'src/components/molecules';
import { allStaticServices } from 'src/utils/data';
import { ServiceDeskContext } from './ServiceDeskContext';

interface ServiceGalleryProps {
  className?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    minHeight: 300,
  },

  boxBadge: {
    width: 'auto',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  titleBadge: {
    marginTop: theme.spacing(1),
    maxWidth: 90,
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '18px',
    color: '#7E7A92',
    textAlign: 'center',

    '&.selected': {
      color: '#2A2D3C',
      fontWeight: 550,
    },
  },
  imgBadge: {
    background: theme.palette.common.white,
    borderRadius: '5px',
    padding: theme.spacing(3),
    width: 99,
    height: 99,
    color: '#0E1E32',

    '&.selected': {
      background: '#36D9A0',
    },
  },
}));

const ServiceGallery = (props: ServiceGalleryProps): ReactElement => {
  const { className } = props;
  const { services, handleSetServices } = useContext(ServiceDeskContext);

  const classes = useStyles();

  return (
    <Box className={clsx('quote-service-gallery', classes.root, className)}>
      {allStaticServices &&
        allStaticServices.map((b) => (
          <ImageNode
            key={b.name}
            title={b.name}
            imgUrl={`/assets/services/${b.image}${
              b.select ? '-selected' : ''
            }.svg`}
            titleProps={{
              className: clsx(classes.titleBadge, b.select ? 'selected' : ''),
            }}
            imgProps={{
              className: clsx(classes.imgBadge, b.select ? 'selected' : ''),
            }}
            align="center"
            className={classes.boxBadge}
          />
        ))}
    </Box>
  );
};

ServiceGallery.defaultProps = {
  className: undefined,
};

export default ServiceGallery;
