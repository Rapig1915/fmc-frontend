import React, { ReactElement, useContext } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  DialogActions,
  DialogTitle,
  Grid,
  Hidden,
  IconButton,
  Typography,
  Link,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { ButtonForward, Image } from 'src/components/atoms';
import {
  ArrowBackIos,
  ArrowForwardIos,
  Check,
  Close,
  Info,
} from '@material-ui/icons';
import { ImageNode } from 'src/components/molecules';
import { IReduxState } from 'src/store/reducers';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'src/components/organisms';
import { QuoteContext } from 'src/views/Quote/QuoteContext';
import { IAppointment, QuoteShowModal } from 'src/types';
import mixPanel from 'src/utils/mixpanel';
import { MIXPANEL_TRACK } from 'src/utils/consts';

import SvgPDF from 'src/assets/pdf.svg';
import SvgSecurity from 'src/assets/badges/security.svg';
import SvgAdvantageMoney from 'src/assets/advantage/money.svg';
import SvgQuestion from 'src/assets/badges/question.svg';
import SvgDiagnosis from 'src/assets/badges/diagnosis.svg';
import ImageHappyCustomer from 'src/assets/happy-customer.svg';
import { brandOf } from 'src/assets/brands';

import TitleTip from './TitleTip';
import EstimateSummary from './EstimateSummary';
import { acceptEstimate } from '../../../../../api/quote';

interface ModalReviewQuoteProps {
  show: boolean;
  onClose: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 900,
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
  title: {
    margin: 0,
    textAlign: 'center',
    padding: theme.spacing(4),
    '& .title-icon': {
      color: '#C5C9DE',
      cursor: 'pointer',
    },
  },
  titleText: {
    position: 'relative',
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
  buttonGroupBack: {
    position: 'absolute',
    left: theme.spacing(2),
    top: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',

    [theme.breakpoints.down('xs')]: {
      '& .title-button': {
        display: 'none',
      },
    },
  },

  intro: {
    display: 'block',
  },

  containerMazda: {
    background: '#ebf1fa',
    padding: theme.spacing(2),
    borderRadius: '7px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgMazda: {
    maxHeight: 300,
    objectFit: 'contain',
    color: theme.palette.common.white,
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
  titleMazda: {
    color: '#685364',
    fontWeight: 300,
    fontStyle: 'normal',
    fontSize: '17px',
    lineHeight: '22px',
  },

  containerWarranty: {
    marginTop: theme.spacing(2),
    background: '#594f91',
    borderRadius: '7px',
    alignItems: 'flex-start',
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
    color: theme.palette.common.white,
    fontWeight: 300,
    fontStyle: 'normal',
    fontSize: 17,
    lineHeight: '22px',
  },
  titlePhone: {
    color: theme.palette.common.white,
    fontWeight: 300,
    fontStyle: 'normal',
    fontSize: 17,
    lineHeight: '22px',
    textDecoration: 'none',
  },

  contentHolder: {
    minHeight: 650,
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    padding: theme.spacing(4),
    alignContent: 'flex-start',
    position: 'relative',

    [theme.breakpoints.down('sm')]: {
      borderRadius: 9,
      minHeight: 500,
      padding: theme.spacing(2),
    },
  },

  inspectContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: theme.spacing(0),
  },
  inspectTitle: {
    marginTop: theme.spacing(0.5),
    fontSize: 18,
    lineHeight: '28px',
    color: '#2A2D3C',
    fontWeight: 600,
    textAlign: 'left',
  },
  inspectContent: {
    marginLeft: theme.spacing(2),
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

  containerHappyCustomer: {
    marginTop: theme.spacing(2),
    background: '#f9f8fd',
    borderRadius: '7px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  imgHappyCustomer: {
    width: 60,
    height: 60,
    objectFit: 'contain',
    margin: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(3),

    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1),
    },
  },
  titleHappyCustomer: {
    color: '#7E7A92',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: '18px',
    lineHeight: '23px',
    '& b': {
      color: '#302A3C',
      fontWeight: 800,
    },
    '& .arrow': {
      position: 'absolute',
      top: 0,
      right: theme.spacing(1),
      height: '100%',
      width: 25,
      color: '#BDC1DA',
      cursor: 'pointer',
    },
  },

  containerReceipt: {
    background: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    margin: 0,
    padding: 0,
    cursor: 'pointer',
  },
  imgReceipt: {
    margin: 0,
    padding: 0,
    marginRight: theme.spacing(3),
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
  titleReceipt: {
    color: '#000000',
    fontWeight: 400,
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: '28px',
    '& .arrow': {
      position: 'absolute',
      top: 0,
      right: theme.spacing(3),
      height: '100%',
      width: 25,
      color: '#BDC1DA',
      cursor: 'pointer',

      '&.shown': {
        width: 40,
      },
    },
  },

  accordion: {
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      border: 'none',
    },
  },
  accordionDetail: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },

  imageAccordion: {
    height: 30,
    marginRight: theme.spacing(2),
  },
  titleAccordion: {
    color: theme.palette.common.black,
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 600,

    [theme.breakpoints.down('xs')]: {
      fontSize: 15,
    },
  },

  actionContainer: {
    width: '100%',
    textAlign: 'right',
  },
}));

const ModalReviewQuote = (props: ModalReviewQuoteProps): ReactElement => {
  const { show, onClose } = props;
  const classes = useStyles();

  const cntHappyCustomers = useSelector(
    (state: IReduxState) => state.quote.customer
  );

  const appointment: IAppointment | null = useSelector(
    (state: IReduxState) => state.quote.appointment
  );

  const [showTip, setShowTip] = React.useState(false);

  const {
    handleShowModal,
    urlReferer,
    isEstimateResponse,
    shouldBookEstimate,
  } = useContext(QuoteContext);

  if (!appointment || !appointment?.attributes || !appointment?.id) {
    return <></>;
  }

  const { attributes } = appointment;

  const {
    appointment_type: appointmentType,
    status: appointmentStatus,
    documents,
    car,
    estimate,
    services,
  } = attributes;

  const isServiceQuote = appointmentType === 'repair';
  const isPPI = appointmentType === 'ppi';
  const isDiag = appointmentType === 'diagnosis';

  const diagCanSchedule =
    !isServiceQuote &&
    appointmentStatus !== 'pending' &&
    appointmentStatus !== 'booked';

  const appointmentCompleted =
    appointmentStatus === 'completed' ||
    appointmentStatus === 'diagnosis_complete';

  const handleSchedule = () => {
    if (shouldBookEstimate) {
      mixPanel(MIXPANEL_TRACK.REPAIR_ESTIMATE);
    } else {
      mixPanel(MIXPANEL_TRACK.DIAGNOSIS_ESTIMATE);
    }

    handleShowModal(QuoteShowModal.SCHEDULE_SERVICE);
  };

  const handleEstimateContinue = async () => {
    if (estimate?.id) {
      acceptEstimate(estimate.id).then(() => {
        handleShowModal(QuoteShowModal.DECIDE_ESTIMATE_RESPONSE);
      });
    } else {
      handleShowModal(QuoteShowModal.DECIDE_ESTIMATE_RESPONSE);
    }
  };

  const handleStepBack = () => {
    handleShowModal(QuoteShowModal.CONTACT);
  };

  const handleClickDocument = (name: string, url: string) => {
    const a = document.createElement('a');

    a.target = '_blank';
    a.href = url;
    a.setAttribute('download', `${name.replace(' ', '-')}.pdf`);
    a.click();
  };

  const getTitle = () => {
    if (isDiag && shouldBookEstimate) return 'Diagnose my car';

    if (isPPI) {
      return 'Pre-Purchase Inspection';
    }

    if (isEstimateResponse && estimate?.services) {
      return Object.keys(estimate.services).join(', ');
    }

    return services.join(', ');
  };

  const getPrice = () => {
    if (isDiag && shouldBookEstimate) return attributes.diagnosis_fee;

    if (isServiceQuote || isEstimateResponse)
      return estimate ? estimate.total_price : 0;

    return attributes.diagnosis_fee;
  };

  const canSchedule =
    !appointmentCompleted &&
    (!urlReferer || (isServiceQuote && estimate) || diagCanSchedule);

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
    >
      <DialogTitle className={classes.title}>
        <Box className={classes.buttonGroupBack}>
          {!urlReferer && (
            <ArrowBackIos className="title-icon" onClick={handleStepBack} />
          )}
        </Box>
        {appointmentCompleted ? (
          <Typography className={classes.titleText}>Work performed:</Typography>
        ) : (
          <Typography className={classes.titleText}>
            Quote{' '}
            <Hidden xsDown>
              <Info
                className="title-icon"
                onMouseOver={() => setShowTip(true)}
                onMouseOut={() => setShowTip(false)}
              />
            </Hidden>
            {showTip && <TitleTip />}
          </Typography>
        )}
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.root}>
        <Grid container spacing={2}>
          <Hidden smDown>
            <Grid container item md={4} className={classes.intro}>
              <ImageNode
                key="mazda"
                title={
                  <>
                    <b>
                      {car.make} {car.year}
                    </b>
                  </>
                }
                imgUrl={brandOf(car.make)}
                titleProps={{ className: classes.titleMazda }}
                imgProps={{ className: classes.imgMazda }}
                className={classes.containerMazda}
              />
              <ImageNode
                key="warranty"
                title={
                  <>
                    <b>Service warranty:</b>
                    <br />
                    24 months / 24,000 mi warranty on each job.
                  </>
                }
                imgUrl={SvgSecurity}
                titleProps={{ className: classes.titleWarranty }}
                imgProps={{ className: classes.imgWarranty }}
                className={classes.containerWarranty}
              />
              <ImageNode
                key="price"
                title={
                  <>
                    <b>Fixed price:</b>
                    <br />
                    All prices are fixed
                  </>
                }
                imgUrl={SvgAdvantageMoney}
                titleProps={{ className: classes.titleWarranty }}
                imgProps={{ className: classes.imgWarranty }}
                className={classes.containerWarranty}
              />
              <ImageNode
                key="call"
                title={
                  <>
                    <b>Questions?</b>
                    <br />
                    <Link
                      key="tel-team-fixmycar"
                      className={classes.titlePhone}
                      href="tel:(214) 799-1773"
                    >
                      Call us (214) 799-1773
                    </Link>
                  </>
                }
                imgUrl={SvgQuestion}
                titleProps={{ className: classes.titleWarranty }}
                imgProps={{ className: classes.imgWarranty }}
                className={classes.containerWarranty}
              />
            </Grid>
          </Hidden>
          <Grid
            container
            item
            md={8}
            sm={12}
            xs={12}
            className={classes.contentHolder}
          >
            <Accordion key="inspection" expanded className={classes.accordion}>
              <AccordionSummary>
                <Image src={SvgDiagnosis} className={classes.imageAccordion} />
                <Typography className={classes.titleAccordion}>
                  {getTitle()}
                </Typography>
                <Box className={classes.flexGrow} />
                <Typography className={classes.titleAccordion}>
                  ${getPrice()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetail}>
                {(!isServiceQuote && !isEstimateResponse && !isPPI) ||
                  (shouldBookEstimate && isDiag && (
                    <Box className={classes.inspectContainer}>
                      <Typography
                        className={classes.inspectTitle}
                        key="title-1"
                      >
                        Includes:
                      </Typography>
                      <Typography
                        className={classes.inspectContent}
                        key="sub-1"
                      >
                        <Check /> Complete inspection of the issue
                      </Typography>
                      <Typography
                        className={classes.inspectContent}
                        key="sub-2"
                      >
                        <Check /> Complimentary multi-point inspection
                      </Typography>
                      <Typography
                        className={classes.inspectContent}
                        key="sub-3"
                      >
                        <Check /> ${getPrice() / 2} goes forwards the repair
                        price
                      </Typography>
                    </Box>
                  ))}
                <ImageNode
                  key="happy-customers"
                  title={
                    <>
                      <b>{cntHappyCustomers} happy customers</b>
                      <br />
                      Booked the same service in your area
                    </>
                  }
                  imgUrl={ImageHappyCustomer}
                  titleProps={{ className: classes.titleHappyCustomer }}
                  imgProps={{ className: classes.imgHappyCustomer }}
                  className={classes.containerHappyCustomer}
                />
              </AccordionDetails>
            </Accordion>
            <EstimateSummary />
            {appointmentCompleted &&
              documents &&
              documents.map(
                (d) =>
                  d.url && (
                    <Accordion
                      key={`download-${d.name}`}
                      square
                      expanded
                      className={classes.accordion}
                    >
                      <AccordionDetails className={classes.accordionDetail}>
                        <ImageNode
                          onClickHandler={() =>
                            handleClickDocument(d.name, d.url)
                          }
                          title={
                            <>
                              Download {d.name}
                              <ArrowForwardIos className="arrow" />
                            </>
                          }
                          imgUrl={SvgPDF}
                          titleProps={{ className: classes.titleReceipt }}
                          imgProps={{ className: classes.imgReceipt }}
                          className={classes.containerReceipt}
                        />
                      </AccordionDetails>
                    </Accordion>
                  )
              )}
            <DialogActions className={classes.actionContainer}>
              {isEstimateResponse && !shouldBookEstimate && (
                <ButtonForward
                  key="continue-estimate-decision"
                  title="Continue"
                  size="large"
                  rounded
                  onClickHandler={handleEstimateContinue}
                />
              )}
              {(!isEstimateResponse || shouldBookEstimate) && canSchedule && (
                <ButtonForward
                  key="schedule-service"
                  title="Schedule service"
                  size="large"
                  rounded
                  onClickHandler={handleSchedule}
                />
              )}
            </DialogActions>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

ModalReviewQuote.defaultProps = {};

export default ModalReviewQuote;
