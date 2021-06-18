import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { Check } from '@material-ui/icons';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';

import { ButtonForward, Image } from 'src/components/atoms';
import { ImageNode } from 'src/components/molecules';

import ImageBrand from 'src/assets/brands';
import ImageBadge from 'src/assets/badges';
import SvgSecurity from 'src/assets/badges/security.svg';
import SvgQuestion from 'src/assets/badges/question-secondary.svg';
import { IAppointment, QuoteShowModal } from 'src/types';
import { setAppointment } from 'src/store/actions';
import { URL } from 'src/utils/consts';

interface ItemQuoteProps {
  className?: string;
  miniMode?: boolean;
  data?: IAppointment;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },

  boxTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  titleCar: {
    color: '#2A2D3C',
    fontSize: 14,
    lineHeight: '16.8px',
    fontWeight: 600,
  },
  titleQuoteDate: {
    color: '#7E7A92',
    fontSize: 12,
    lineHeight: '14.4px',
    fontWeight: 500,
    fontStyle: 'italic',
  },

  contentBox: {
    borderRadius: 8,
    width: '100%',
    minHeight: 150,
    background: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    padding: theme.spacing(2),
  },
  flexGrow: {
    flexGrow: 1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  infoService: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
    borderBottom: '1px solid #EFF1F7',
  },
  imageService: {
    width: 40,
    padding: theme.spacing(1),
    height: 'auto',
    objectFit: 'cover',
  },

  imageBrand: {
    width: (props: ItemQuoteProps) => (!props.miniMode ? 100 : 50),
    height: (props: ItemQuoteProps) => (!props.miniMode ? 70 : undefined),
    objectFit: 'cover',
    [theme.breakpoints.down('xs')]: {
      display: (props: ItemQuoteProps) => (props.miniMode ? 'block' : 'none'),
    },
  },

  textServiceName: {
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: 23,
    lineHeight: '24px',
    color: '#2A2D3C',
  },
  textPrice: {
    fontWeight: 800,
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: '28px',
    color: theme.palette.common.black,
  },

  boxMechanic: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageMechanic: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  titleMechanic: {
    marginLeft: theme.spacing(1),
    textAlign: 'left',
    fontStyle: 'normal',
    fontSize: 11.84,
    lineHeight: '14.71px',
    color: '#302A3C',
    fontWeight: 400,
    width: 110,

    '& b': {
      fontWeight: 700,
    },
  },
  buttonViewDetail: {
    marginTop: theme.spacing(0.3),
    marginBottom: theme.spacing(0.2),
    textTransform: 'none',
    fontSize: 14.42,
    lineHeight: '21.02px',
  },

  boxQuoteDetail: {
    display: 'flex',
    flexDirection: 'column',
    '& .main': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',

      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },

      '& .buttons': {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('xs')]: {
          '& .button-book': {
            display: 'none',
          },
        },
      },
    },
    '& .warranty': {
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
  },
  inspectContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    lineHeight: '28px',
    color: '#7E7A92',
    fontWeight: 400,
    textAlign: 'left',
    '& .MuiSvgIcon-root': {
      color: '#36D9A0',
      margin: theme.spacing(1),
    },
  },

  containerWarranty: {
    margin: theme.spacing(1),
    background: '#EBF1FA',
    borderRadius: '7px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxHeight: 100,
  },
  imgWarranty: {
    width: 30,
    height: 30,
    objectFit: 'contain',
    color: theme.palette.common.white,
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  titleWarranty: {
    color: '#302A3C',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '13.84px',
    lineHeight: '20.71px',
  },
}));

const ItemQuote = (props: ItemQuoteProps): ReactElement => {
  const { className, miniMode, data } = props;

  const classes = useStyles({ miniMode });
  const dispatch = useDispatch();
  const history = useHistory();

  if (!data || !data?.attributes.car.make) return <></>;

  const handleViewDetail = () => {
    dispatch(setAppointment(data));
    history.push(URL.QUOTE, {
      modal: QuoteShowModal.REVIEW_QUOTE,
    });
  };

  const handleBookNow = () => {
    dispatch(setAppointment(data));
    history.push(URL.QUOTE, {
      modal: QuoteShowModal.FINISH_BOOKING,
    });
  };

  const renderCarLogo = () => {
    const keyBrand =
      data?.attributes.car.make.replace(' ', '-').toLocaleLowerCase() ||
      'blank';
    const imageBrand = ImageBrand[keyBrand] || ImageBrand.blank;
    return (
      <Image lazy={false} className={classes.imageBrand} src={imageBrand} />
    );
  };

  const renderImageService = () => {
    // appointment?.attributes.car.make.replace(' ', '-').toLocaleLowerCase() ||
    // 'blank';
    return (
      <Image
        lazy={false}
        className={classes.imageService}
        src={ImageBadge.diagnosis}
      />
    );
  };

  const renderMechanic = () => {
    return (
      <Box className={classes.boxMechanic}>
        <Image
          lazy={false}
          className={classes.imageMechanic}
          src={data?.attributes.mechanic && data?.attributes.mechanic.photo}
        />
        <span className={classes.titleMechanic}>
          <b>Your mechanic:</b>
          <br />
          {data?.attributes.mechanic && data?.attributes.mechanic.name}
        </span>
        <Box className={classes.flexGrow} />
        <Button
          color="primary"
          className={classes.buttonViewDetail}
          onClick={handleViewDetail}
        >
          View details
        </Button>
      </Box>
    );
  };

  const renderQuoteDetail = () => {
    return (
      <Box className={classes.boxQuoteDetail}>
        <Box key="main" className="main">
          <Box key="services" className="services">
            <Typography className={classes.inspectContent} key="service-1">
              <Check /> Complete inspection of the issue
            </Typography>
            <Typography className={classes.inspectContent} key="service-2">
              <Check /> Complimentary 50-point inspection
            </Typography>
            <Typography className={classes.inspectContent} key="service-3">
              <Check /> $35 goes towards the repair price
            </Typography>
          </Box>
          <Box key="buttons" className="buttons">
            <ButtonForward
              title="Book now"
              className="button-book"
              rounded
              onClickHandler={handleBookNow}
            />
            <Button
              color="primary"
              className={classes.buttonViewDetail}
              onClick={handleViewDetail}
            >
              View details
            </Button>
          </Box>
        </Box>
        <Box key="warranty" className="warranty">
          <ImageNode
            key="warranty"
            title={
              <>
                <b>Service waranty:</b>
                <br />
                24 months / 24,000 mi
                <br /> waranty on each job.
              </>
            }
            imgUrl={SvgSecurity}
            titleProps={{ className: classes.titleWarranty }}
            imgProps={{ className: classes.imgWarranty }}
            className={classes.containerWarranty}
          />
          <ImageNode
            key="advisor"
            title={
              <>
                <b>Talk to a service advisor:</b>
                <br />
                Call us (214) 620-0702
              </>
            }
            imgUrl={SvgQuestion}
            titleProps={{ className: classes.titleWarranty }}
            imgProps={{ className: classes.imgWarranty }}
            className={classes.containerWarranty}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box className={clsx('dashboard-quote-item', classes.root, className)}>
      <Box key="box-title" className={classes.boxTitle}>
        <Typography key="car-name" className={classes.titleCar}>
          {data?.attributes.car.year} {data?.attributes.car.make}{' '}
          {data?.attributes.car.model}
        </Typography>
        <Typography key="quote-date" className={classes.titleQuoteDate}>
          March 2, 2021
        </Typography>
      </Box>
      <Box className={classes.contentBox}>
        {!miniMode && renderCarLogo()}
        <Box className={classes.content}>
          <Box className={classes.infoService}>
            {miniMode && renderCarLogo()}
            {renderImageService()}
            <Typography key="service-name" className={classes.textServiceName}>
              {data?.attributes.services[0] || ''}
            </Typography>
            <Box className={classes.flexGrow} />
            <Typography key="price" className={classes.textPrice}>
              $ {data?.attributes.diagnosis_fee}
            </Typography>
          </Box>
          {miniMode ? renderMechanic() : renderQuoteDetail()}
        </Box>
      </Box>
    </Box>
  );
};

ItemQuote.defaultProps = {
  className: undefined,
  miniMode: true,
  data: undefined,
};

export default ItemQuote;
