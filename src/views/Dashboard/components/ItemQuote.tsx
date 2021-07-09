import React, { ReactElement } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Check } from '@material-ui/icons';
import { Box, Button, makeStyles, Typography, Link } from '@material-ui/core';

import { ButtonForward, Image } from 'src/components/atoms';
import { ImageNode } from 'src/components/molecules';

import { brandOf } from 'src/assets/brands';
import SvgDiagnosis from 'src/assets/services/diagnosis.svg';
import SvgSecurity from 'src/assets/badges/security-black.svg';
import SvgQuestion from 'src/assets/badges/question-black.svg';
import { IAppointment, QuoteShowModal } from 'src/types';
import { setAppointment } from 'src/store/actions';
import { processURL, URL } from 'src/utils/consts';

interface ItemQuoteProps {
  className?: string;
  miniMode?: boolean;
  data?: IAppointment;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
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
    padding: theme.spacing(1),

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.2),
    },
  },
  infoService: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: theme.spacing(1),
    borderBottom: '1px solid #EFF1F7',
  },
  imageService: {
    width: 40,
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
    height: 'auto',
    objectFit: 'contain',
  },

  imageBrand: {
    width: (props: ItemQuoteProps) => (!props.miniMode ? 100 : 50),
    height: (props: ItemQuoteProps) => (!props.miniMode ? 70 : 'auto'),
    objectFit: 'contain',
    [theme.breakpoints.down('xs')]: {
      display: (props: ItemQuoteProps) => (props.miniMode ? 'block' : 'none'),
    },
  },

  textServiceName: {
    fontWeight: 700,
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: '28px',
    color: '#2A2D3C',
  },
  textPrice: {
    fontWeight: 800,
    fontStyle: 'normal',
    fontSize: 23,
    lineHeight: '24px',
    color: theme.palette.common.black,
    marginRight: theme.spacing(1),
    flexGrow: 1,
    textAlign: 'right',
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
    lineHeight: '20px',
    color: '#7E7A92',
    fontWeight: 400,
    textAlign: 'left',
    '& .MuiSvgIcon-root': {
      color: '#36D9A0',
      margin: theme.spacing(0.5),
    },
  },

  containerWaiting: {
    width: '100%',
    marginTop: theme.spacing(1),
    background: theme.palette.common.white,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  titleWaiting: {
    color: '#667296',
    fontSize: 25,
    lineHeight: '30px',
    fontWeight: 800,
  },
  checkWaiting: {
    color: '#667296',
    fontSize: 20,
    lineHeight: '24px',
    fontWeight: 400,
  },
  hoursWaiting: {
    color: '#36d9a0',
    fontSize: 45,
    lineHeight: '59.24px',
    fontWeight: 265,
    '& b': {
      color: '#4A37B1',
      fontSize: 50,
      lineHeight: '75.93px',
      fontWeight: 700,
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
  titlePhone: {
    color: '#302A3C',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: 13.84,
    lineHeight: '20.71px',
    textDecoration: 'none',
  },
}));

const ItemQuote = (props: ItemQuoteProps): ReactElement => {
  const { className, miniMode, data } = props;

  const classes = useStyles({ miniMode });
  const dispatch = useDispatch();
  const history = useHistory();

  if (!data?.attributes.car.make) return <></>;

  const { attributes } = data;

  const {
    appointment_type: appointmentType,
    appointment_day: appointmentDay,
    appointment_time: appointmentTime,
    address,
    car,
    mechanic,
    estimate,
    services,
    status,
    diagnosis_fee: diagnosisFee,
  } = attributes;

  const isServiceQuote = appointmentType === 'repair';

  const handleViewDetail = () => {
    dispatch(setAppointment(data));
    history.push(
      processURL(URL.QUOTE, { zip: address, referer: URL.DASHBOARD }),
      {
        modal: QuoteShowModal.REVIEW_QUOTE,
      }
    );
  };

  const handleSchedule = () => {
    dispatch(setAppointment(data));
    history.push(
      processURL(URL.QUOTE, { zip: address, referer: URL.DASHBOARD }),
      {
        modal: QuoteShowModal.REVIEW_QUOTE,
      }
    );
  };

  const renderCarLogo = () => {
    return (
      <Image
        lazy={false}
        className={classes.imageBrand}
        src={brandOf(car.make)}
      />
    );
  };

  const renderImageService = () => {
    return (
      <Image lazy={false} className={classes.imageService} src={SvgDiagnosis} />
    );
  };

  const renderMechanic = () => {
    return (
      <Box className={classes.boxMechanic}>
        <Image
          lazy={false}
          className={classes.imageMechanic}
          src={mechanic && mechanic.photo}
        />
        <span className={classes.titleMechanic}>
          <b>Your mechanic:</b>
          <br />
          {mechanic && mechanic.name}
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
    if (isServiceQuote) {
      return (
        <Box className={classes.boxQuoteDetail}>
          {!estimate ? (
            <Box className={classes.containerWaiting}>
              <Typography key="title" className={classes.titleWaiting}>
                We&apos;re working on your quote
              </Typography>
              <Typography key="notify" className={classes.checkWaiting}>
                We&apos;ll notify you ASAP
              </Typography>
            </Box>
          ) : (
            <Box key="warranty" className="warranty">
              <ImageNode
                key="warranty"
                title={
                  <>
                    <b>Service warranty:</b>
                    <br />
                    24 months / 24,000 mi
                    <br /> warranty on each job.
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
                    <Link
                      key="tel-team-fixmycar"
                      className={classes.titlePhone}
                      href="tel:(214) 620-0702"
                    >
                      Call us (214) 620-0702
                    </Link>
                  </>
                }
                imgUrl={SvgQuestion}
                titleProps={{ className: classes.titleWarranty }}
                imgProps={{ className: classes.imgWarranty }}
                className={classes.containerWarranty}
              />
            </Box>
          )}
        </Box>
      );
    }

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
              <Check /> ${diagnosisFee / 2} goes towards the repair price
            </Typography>
          </Box>
          <Box key="buttons" className="buttons">
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
                <b>Service warranty:</b>
                <br />
                24 months / 24,000 mi
                <br /> warranty on each job.
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
                <Link
                  key="tel-team-fixmycar"
                  className={classes.titlePhone}
                  href="tel:(214) 620-0702"
                >
                  Call us (214) 620-0702
                </Link>
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

  const scheduledTime = () => {
    if (!appointmentDay || !appointmentTime) return '';

    return `Service Booked for: ${moment(appointmentDay).format(
      'MMM DD, YYYY'
    )} ${appointmentTime}`;
  };

  const jobCompleted =
    status === 'completed' || status === 'diagnosis_complete';

  const canSchedule =
    status !== 'pending' &&
    status !== 'booked' &&
    ((isServiceQuote && estimate) || !isServiceQuote);

  const isCompleted = status === 'completed' || status === 'diagnosis_complete';

  const getTitle = () => {
    if (!isServiceQuote) return 'Diagnose my car';

    return services.join(', ');
  };

  const getPrice = () => {
    if (isServiceQuote) return estimate ? estimate.total_price : 0;

    return attributes.diagnosis_fee;
  };

  return (
    <Box className={clsx('dashboard-quote-item', classes.root, className)}>
      <Box key="box-title" className={classes.boxTitle}>
        <Typography key="car-name" className={classes.titleCar}>
          {car.year} {car.make} {car.model}
        </Typography>
        {!isCompleted && (
          <Typography key="quote-date" className={classes.titleQuoteDate}>
            {scheduledTime()}
          </Typography>
        )}
      </Box>
      <Box className={classes.contentBox}>
        {!miniMode && renderCarLogo()}
        <Box className={classes.content}>
          <Box className={classes.infoService}>
            {miniMode && renderCarLogo()}
            {renderImageService()}
            <Typography key="service-name" className={classes.textServiceName}>
              {getTitle()}
            </Typography>
            <Box className={classes.flexGrow} />
            {!!getPrice() && !jobCompleted && (
              <Typography key="price" className={classes.textPrice}>
                $ {getPrice()}
              </Typography>
            )}

            {canSchedule && !isCompleted && (
              <ButtonForward
                title="Schedule Service"
                rounded
                onClickHandler={handleSchedule}
              />
            )}
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
