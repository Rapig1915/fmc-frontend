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
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { ButtonForward, Image } from 'src/components/atoms';
import { ArrowBackIos, Check, Close, Help } from '@material-ui/icons';
import { ImageNode } from 'src/components/molecules';
import { IReduxState } from 'src/store/reducers';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from 'src/components/organisms';
import { QuoteContext } from 'src/views/Quote/QuoteContext';
import { IAppointment, QuoteShowModal } from 'src/types';

import SvgSecurity from 'src/assets/badges/security.svg';
import SvgAdvantageMoney from 'src/assets/advantage/money.svg';
import SvgQuestion from 'src/assets/badges/question.svg';
import SvgDiagnosis from 'src/assets/badges/diagnosis.svg';
import ImageHappyCustomer from 'src/assets/happy-customer.png';
import ImageBrand from 'src/assets/brands';

import BoxFAQ from './BoxFAQ';

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
    fontSize: '17px',
    lineHeight: '22px',
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

  accordion: {
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      border: 'none',
    },
  },
  accordionDetail: {
    display: 'flex',
    flexDirection: 'column',
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

  const { handleShowModal } = useContext(QuoteContext);

  const handleSchedule = () => {
    handleShowModal(QuoteShowModal.SCHEDULE_SERVICE);
  };

  const handleStepBack = () => {
    handleShowModal(QuoteShowModal.CONTACT);
  };

  if ((!appointment || !appointment.id) && show) {
    // error no active appointment
    handleShowModal(QuoteShowModal.NONE);
  }

  const keyBrand =
    appointment?.attributes.car.make.replace(' ', '-').toLocaleLowerCase() ||
    'blank';
  const imageBrand = ImageBrand[keyBrand] || ImageBrand.blank;

  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      scroll="body"
    >
      <DialogTitle className={classes.title}>
        <Box className={classes.buttonGroupBack}>
          <ArrowBackIos className="title-icon" onClick={handleStepBack} />
        </Box>
        <Typography className={classes.titleText}>
          Quote <Help className="title-icon" />
        </Typography>
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
                      {appointment?.attributes.car.make}{' '}
                      {appointment?.attributes.car.year}
                    </b>
                  </>
                }
                imgUrl={imageBrand}
                titleProps={{ className: classes.titleMazda }}
                imgProps={{ className: classes.imgMazda }}
                className={classes.containerMazda}
              />
              <ImageNode
                key="warranty"
                title={
                  <>
                    <b>Service waranty:</b>
                    <br />
                    24 months / 24,000 mi waranty on each job.
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
                    Call us (214) 620-0702
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
            <Accordion square expanded className={classes.accordion}>
              <AccordionSummary>
                <Image src={SvgDiagnosis} className={classes.imageAccordion} />
                <Typography className={classes.titleAccordion}>
                  Inspection:
                </Typography>
                <Box className={classes.flexGrow} />
                <Typography className={classes.titleAccordion}>
                  ${appointment?.attributes.diagnosis_fee}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.accordionDetail}>
                <Box className={classes.inspectContainer}>
                  <Typography className={classes.inspectTitle} key="title-1">
                    Includes:
                  </Typography>
                  <Typography className={classes.inspectContent} key="sub-1">
                    <Check /> Complete inspection of the issue
                  </Typography>
                  <Typography className={classes.inspectContent} key="sub-2">
                    <Check /> Complimentary multi-point inspection
                  </Typography>
                  <Typography className={classes.inspectContent} key="sub-3">
                    <Check /> $35 goes forwards the repair price
                  </Typography>
                </Box>
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
                <BoxFAQ />
              </AccordionDetails>
            </Accordion>
            <DialogActions className={classes.actionContainer}>
              {appointment?.attributes.status !== 'complete' && (
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
