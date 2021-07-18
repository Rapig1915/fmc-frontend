import React, { ReactElement, useContext, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { ArrowForwardIos, Help, Search } from '@material-ui/icons';
import ButtonForward from 'src/components/atoms/ButtonForward';
import mixPanel from 'src/utils/mixpanel';
import { MIXPANEL_TRACK } from 'src/utils/consts';
import { ModalNotSure, ModalSelectStaticService } from '../Modals';
import { QuoteContext } from '../../QuoteContext';

interface ServiceBarProps {
  className?: string;
  onContinue: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    background: '#DFE5F0',
    borderRadius: 12,
    padding: theme.spacing(2),
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',

    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
    },
  },

  subContainer: {
    background: theme.palette.common.white,
    borderRadius: 22.5,
    position: 'relative',
    height: 45,
    flexGrow: 1,
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSearch: {
    padding: theme.spacing(1),
    height: '100%',
    width: 'auto',
    color: '#D8D8D8',
  },
  labelSearch: {
    color: '#B1B3BE',
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: '21px',
    fontWeight: 500,
    flexGrow: 1,
    cursor: 'pointer',
  },
  buttonSearch: {
    height: '100%',
    '&:hover': {
      background: '#3CD791',
    },
  },

  iconHelp: {
    padding: theme.spacing(1),
    height: '100%',
    width: 'auto',
    color: '#7157FF',
    cursor: 'pointer',
  },
  labelNotSure: {
    color: '#2A2D3C',
    fontSize: 17,
    letterSpacing: 0,
    lineHeight: '21px',
    fontWeight: 900,
    flexGrow: 1,
    cursor: 'pointer',
  },
  iconArrow: {
    padding: theme.spacing(1.5),
    height: '100%',
    width: 'auto',
    color: '#2A2D3C',
    cursor: 'pointer',
  },
}));

const ServiceBar = (props: ServiceBarProps): ReactElement => {
  const { className, onContinue } = props;

  const classes = useStyles();

  const { staticServices } = useContext(QuoteContext);

  const [openModalNotSure, setOpenModalNotSure] = useState(false);
  const [
    openModalSelectStaticService,
    setOpenModalSelectStaticService,
  ] = useState(false);

  const handleSearch = () => {
    setOpenModalSelectStaticService(true);
  };

  const handleContinue = () => {
    setOpenModalNotSure(false);
    mixPanel(MIXPANEL_TRACK.NOT_SURE_WHATS_WRONG_NEXT);
    onContinue();
  };

  return (
    <Box className={clsx('quote-service-bar', classes.root, className)}>
      <Box className={classes.subContainer} key="box-search-service">
        <Search className={classes.iconSearch} />
        <Typography className={classes.labelSearch} onClick={handleSearch}>
          {staticServices.length <= 0
            ? 'Search for service'
            : `${staticServices.length} selected`}
        </Typography>
        <ButtonForward
          className={classes.buttonSearch}
          title="Search"
          rounded
          size="large"
          onClickHandler={handleSearch}
        />
      </Box>
      <Box
        className={classes.subContainer}
        key="box-not-sure-wrong"
        onClick={() => setOpenModalNotSure(true)}
      >
        <Help className={classes.iconHelp} />
        <Typography className={classes.labelNotSure}>
          Not sure what&apos;s wrong?
        </Typography>
        <ArrowForwardIos className={classes.iconArrow} />
      </Box>
      <ModalSelectStaticService
        show={openModalSelectStaticService}
        onClose={() => setOpenModalSelectStaticService(false)}
      />
      <ModalNotSure
        show={openModalNotSure}
        onClose={() => setOpenModalNotSure(false)}
        onContinue={() => handleContinue()}
      />
    </Box>
  );
};

ServiceBar.defaultProps = {
  className: undefined,
};

export default ServiceBar;
