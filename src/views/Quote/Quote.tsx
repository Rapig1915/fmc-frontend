import React, { ReactElement, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useSnackbar } from 'notistack';
import { Container, makeStyles, Typography } from '@material-ui/core';
import {
  QuoteShowModal,
  QuoteStep,
  RequestConfirmAppointment,
  RequestCreateAppointment,
  RequestUpdateAppointmentTime,
  RequestUpdateAppointmentContact,
  ResponseAppointment,
  ResponseSignin,
  RequestUpdateEstimateResponse,
} from 'src/types';
import {
  confirmAppointment,
  createAppointment,
  getAppointment,
  getHappyCustomer,
  updateAppointment,
  updateAppointmentEstimate,
} from 'src/api/quote';
import { IReduxState } from 'src/store/reducers';
import { setAppointment, setAuthToken, setZip } from 'src/store/actions';
import { Splash } from 'src/layouts/components';
import mixPanel from 'src/utils/mixpanel';
import { MIXPANEL_TRACK, URL } from 'src/utils/consts';
import { signIn } from 'src/api/auth';
import logger from 'src/utils/logger';
import { callAdsQuote, callAdsBooking } from 'src/utils/ads';

import { FormContact, SearchCar, ServiceDesk } from './components';
import SimpleCongrats from './components/SimpleCongrats';
import QuoteContainer from './QuoteContainer';
import {
  ModalReviewQuote,
  ModalScheduleService,
  ModalCongrats,
  ModalContact,
  ModalFinishBooking,
  ModalServiceIntro,
  ModalDecideEstimate,
} from './components/Modals';
import {
  IQuoteReason,
  IQuoteCar,
  QuoteContext,
  IQuoteContact,
} from './QuoteContext';
import { ModalInputZip } from '../Home/components';

const useStyles = makeStyles(() => ({
  root: {
    '& .hidden': {
      display: 'none',
    },
  },
}));

const Quote = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const zip = useSelector((state: IReduxState) => state.quote.zip);
  const user = useSelector((state: IReduxState) => state.auth.user);
  const location = useLocation();

  const { appId: appIdParam }: { appId: string } = useParams();
  const isEstimateResponse =
    !!appIdParam && location.pathname.includes('estimate_response');
  const shouldBookEstimate =
    !!appIdParam && !location.pathname.includes('estimate_response');

  const params = queryString.parse(location.search);
  const zipQuery = Array.isArray(params.zip) ? params.zip[0] || '' : params.zip;
  const utmSrcQuery = Array.isArray(params.utm_source)
    ? params.utm_source[0] || ''
    : params.utm_source;
  const gclid = Array.isArray(params.gclid)
    ? params.gclid[0] || ''
    : params.gclid;

  const urlReferer = Array.isArray(params.referer)
    ? params.referer[0] || ''
    : params.referer || '';

  const [openSplash, setOpenSplash] = React.useState(false);

  const [requestInProgress, setRequestInProgress] = React.useState(false);

  useEffect(() => {
    if (!isEstimateResponse && !shouldBookEstimate) {
      // For normal quote page, require zip
      const asyncReadZip = async () => {
        if (zipQuery && zipQuery !== zip) {
          if (!urlReferer) setOpenSplash(true);

          if (zipQuery.length === 5) {
            const happyCustomer = await getHappyCustomer(zipQuery);
            const newHappyCustomer =
              (happyCustomer && happyCustomer['times-used']) || 0;

            if (zipQuery && newHappyCustomer) {
              dispatch(setZip(zipQuery, newHappyCustomer));
              mixPanel(MIXPANEL_TRACK.ZIP);
            }
          }
        }
      };

      asyncReadZip();

      const timerSplashId = setTimeout(() => setOpenSplash(false), 3000);

      return () => {
        if (timerSplashId) clearTimeout(timerSplashId);
      };
    }

    const asyncReadAppointment = async () => {
      try {
        setOpenSplash(true);
        const appointment = await getAppointment(appIdParam);

        const happyCustomer = await getHappyCustomer(
          appointment.data.attributes.address
        );
        const newHappyCustomer =
          (happyCustomer && happyCustomer['times-used']) || 0;

        if (newHappyCustomer) {
          mixPanel(MIXPANEL_TRACK.ZIP);
          dispatch(
            setZip(appointment.data.attributes.address, newHappyCustomer)
          );
          dispatch(setAppointment(appointment.data));
        }

        setOpenSplash(false);
      } catch (err) {
        logger.error(err);
        history.push(URL.HOME);
      }
    };

    asyncReadAppointment();

    return () => {};
  }, [
    zipQuery,
    urlReferer,
    dispatch,
    history,
    zip,
    isEstimateResponse,
    appIdParam,
    shouldBookEstimate,
  ]);

  const showZipModal =
    !isEstimateResponse && !shouldBookEstimate && !zip && !zipQuery;

  const handleSetZipFromModal = (payload: {
    zip?: string;
    customer?: number;
  }) => {
    if (payload.zip && payload.customer) {
      mixPanel(MIXPANEL_TRACK.ZIP);
      dispatch(setZip(payload.zip || '', payload.customer || 0));

      setOpenSplash(true);
      const timerId = setTimeout(() => {
        setOpenSplash(false);
        clearTimeout(timerId);
      }, 3000);
    }
  };

  const appId = useSelector(
    (state: IReduxState) =>
      state.quote.appointment && state.quote.appointment.id
  );

  const [display, setDisplay] = React.useState(0);

  /**
   * Quote Context
   */
  const [step, setStep] = useState(QuoteStep.QUOTE_SERVICE_DESK);
  const handleSetStep = useCallback(
    (newStep: QuoteStep) => setStep(newStep),
    []
  );

  const handleStepChange = (newStep: QuoteStep, bForce?: boolean): void => {
    if (
      bForce ||
      parseInt(newStep as string, 10) <= parseInt(step as string, 10)
    )
      handleSetStep(newStep);
  };

  const [showModal, setShowModal] = useState(
    (location.state && location.state.modal) ||
      (isEstimateResponse || shouldBookEstimate
        ? QuoteShowModal.REVIEW_QUOTE
        : QuoteShowModal.NONE)
  );

  const handleShowModal = useCallback(
    (newShowModal: QuoteShowModal) => setShowModal(newShowModal),
    []
  );

  React.useEffect(() => {
    if (urlReferer && showModal === QuoteShowModal.NONE)
      history.push(urlReferer);
  }, [showModal, urlReferer, history]);

  const [staticServices, setStaticServices] = useState<string[]>([]);
  const handleSetStaticServices = useCallback(
    (newServices: string[]) => {
      setDisplay(display + 1);
      setStaticServices(newServices);
    },
    [display]
  );

  const [services, setServices] = useState<string[]>([]);
  const handleSetServices = useCallback(
    (newServices: string[]) => setServices(newServices),
    []
  );

  const [reason, setReason] = useState<IQuoteReason>({
    selection: {},
    otherReason: '',
    note: '',
  });

  const isNotSureFunnel = reason && Object.keys(reason.selection).length > 0;

  const isPPI =
    services.length === 1 && services[0] === 'Pre-Purchase Inspection';

  const isInspectionServices: boolean[] = [];
  if (services.length > 0) {
    services.forEach((item) =>
      isInspectionServices.push(item.toLowerCase().includes('inspection'))
    );
  } else if (staticServices.length > 0) {
    staticServices.forEach((item) =>
      isInspectionServices.push(item.toLowerCase().includes('inspection'))
    );
  }

  const isInspections =
    (services.length > 0 || staticServices.length > 0) &&
    !isInspectionServices.includes(false);

  const handleSetReason = useCallback(
    (newReason: IQuoteReason) => setReason(newReason),
    []
  );

  const [car, setCar] = useState<IQuoteCar>({
    search: {
      plate_number: '',
      state: '',
    },
    attributes: {
      year: '',
      make: '',
      model: '',
      engine_size: '',
      mileage: '',
      vin: '',
    },
  });
  const handleSetCar = useCallback((newCar: IQuoteCar) => setCar(newCar), []);

  const [contact, setContact] = useState<IQuoteContact>({
    name: (user && user.attributes.name) || '',
    email: (user && user.attributes.email) || '',
    phone: (user && user.attributes.phone) || '',
  });

  const handleSetContact = useCallback(
    (newContact: IQuoteContact) => setContact(newContact),
    []
  );

  const [loggingIn, setLoggingIn] = useState(false);
  const handleSetLoggingIn = (state: boolean): void => {
    setLoggingIn(state);
  };

  const login = (resp: ResponseAppointment) => {
    handleSetLoggingIn(true);

    const timerId = setTimeout(async () => {
      const response: ResponseSignin = await signIn(
        {
          id: `${resp.data && resp.data.id}`,
        },
        true
      );

      handleSetLoggingIn(false);

      if (
        response &&
        response.auth_token &&
        response.user &&
        response.user.id
      ) {
        dispatch(
          setAuthToken(
            response.auth_token,
            response.user.id,
            response.user.email
          )
        );

        if (isNotSureFunnel || isPPI || isInspections) {
          history.push(URL.DASHBOARD);
        } else {
          handleSetStep(QuoteStep.QUOTE_CONGRATS);
        }
      } else {
        handleStepChange(QuoteStep.QUOTE_CONTACT, true);
      }

      if (timerId) clearTimeout(timerId);
    }, 3000);
  };

  const clearAll = useCallback(() => {
    handleSetStep(QuoteStep.QUOTE_SERVICE_DESK);
    handleShowModal(QuoteShowModal.NONE);

    handleSetStaticServices([]);
    handleSetServices([]);

    handleSetReason({
      selection: {},
      otherReason: '',
      note: '',
    });

    handleSetCar({
      search: {
        plate_number: '',
        state: '',
      },
      attributes: {
        year: '',
        make: '',
        model: '',
        engine_size: '',
        mileage: '',
        vin: '',
      },
    });

    handleSetContact({
      name: '',
      email: '',
      phone: '',
    });
  }, [
    handleSetStep,
    handleShowModal,
    handleSetStaticServices,
    handleSetServices,
    handleSetReason,
    handleSetCar,
    handleSetContact,
  ]);

  const showCommonError = () => {
    enqueueSnackbar('An error occured while processing your quote.', {
      variant: 'error',
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    });
  };

  const handleContinueOnService = () => {
    mixPanel(MIXPANEL_TRACK.REPAIR_SERVICE);
    handleStepChange(QuoteStep.QUOTE_SEARCH_CAR, true);
  };

  const grabInputData = (): RequestCreateAppointment => {
    const allSubReason: string[] = Object.keys(reason.selection).reduce(
      (obj: string[], mR): string[] => [
        ...obj,
        ...(reason.selection[mR] || []),
      ],
      []
    );
    const hasOtherReason: boolean = allSubReason.includes('Other');
    let diagInput = hasOtherReason
      ? reason.otherReason
      : allSubReason.join('. ');

    if (reason.note !== '') {
      diagInput += `. ${reason.note}`;
    }

    if (isInspections) {
      diagInput = staticServices.join(', ');
    }

    let appointmentType;
    let level;
    if (isNotSureFunnel || isInspections) {
      appointmentType = 'diagnosis';
      level = 'A';
    } else if (isPPI) {
      appointmentType = 'ppi';
      level = 'A';
    } else {
      appointmentType = 'repair';
      level = 'B';
    }

    return {
      kind: 'RequestCreateAppointment',
      appointment_type: appointmentType,
      car_attributes: {
        ...car.attributes,
      },
      tracking_attributes: {
        utm_source: utmSrcQuery || '',
        utm_medium: '',
        utm_term: '',
        utm_content: '',
        utm_campaign: '',
        gclid: gclid || '',
      },
      location_attributes: {
        zip,
      },
      address: zip,
      diagnosis_input: diagInput,
      services: [...services, ...staticServices],
      category_selected: Object.keys(reason.selection)
        .filter((x) => !!reason.selection[x])
        .join(', '),
      level,
    };
  };

  const handleCreateAppointment = async () => {
    setRequestInProgress(true);
    createAppointment(grabInputData())
      .then((resp: ResponseAppointment) => {
        dispatch(setAppointment(resp.data));

        if (isNotSureFunnel || isPPI || isInspections) {
          handleShowModal(QuoteShowModal.CONTACT);
        } else {
          handleStepChange(QuoteStep.QUOTE_CONTACT, true);
        }
      })
      .catch(() => showCommonError())
      .finally(() => setRequestInProgress(false));
  };

  const handleUpdateAppointment = async (
    data:
      | RequestUpdateAppointmentTime
      | RequestUpdateAppointmentContact
      | RequestCreateAppointment
  ) => {
    if (!appId) {
      // error handling
      return;
    }

    setRequestInProgress(true);

    updateAppointment(appId, data)
      .then((resp: ResponseAppointment) => {
        dispatch(setAppointment(resp.data));

        if (isEstimateResponse && !shouldBookEstimate) {
          if (showModal === QuoteShowModal.SCHEDULE_SERVICE)
            handleShowModal(QuoteShowModal.FINISH_BOOKING);
        } else if (
          isNotSureFunnel ||
          isPPI ||
          isInspections ||
          urlReferer === URL.DASHBOARD ||
          shouldBookEstimate
        ) {
          if (!shouldBookEstimate && showModal === QuoteShowModal.NONE)
            handleShowModal(QuoteShowModal.CONTACT);
          else if (showModal === QuoteShowModal.SCHEDULE_SERVICE)
            handleShowModal(QuoteShowModal.FINISH_BOOKING);
          else if (showModal === QuoteShowModal.REVIEW_QUOTE)
            handleShowModal(QuoteShowModal.SCHEDULE_SERVICE);
          else handleShowModal(QuoteShowModal.REVIEW_QUOTE);
        } else if (step === QuoteStep.QUOTE_CONTACT) {
          login(resp);
        } else {
          handleStepChange(QuoteStep.QUOTE_CONTACT, true);
        }

        if (data.kind === 'RequestUpdateAppointmentContact') {
          callAdsQuote(resp.data);
        }
      })
      .catch((error) => {
        // Error ????
        if (data.kind === 'RequestUpdateAppointmentContact') {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors &&
            Array.isArray(error.response.data.errors)
          ) {
            handleSetContact({
              ...contact,
              error: error.response.data.errors[0],
            });

            setTimeout(() => {
              handleSetContact({
                ...contact,
                error: '',
              });
            }, 3000);
          }
        } else {
          showCommonError();
        }
      })
      .finally(() => setRequestInProgress(false));
  };

  const handleRespondAppointmentEstimate = async (
    data: RequestUpdateEstimateResponse
  ) => {
    if (!appId) {
      // error handling
      return;
    }

    setRequestInProgress(true);

    updateAppointmentEstimate(appId, data)
      .then(() => {
        if (isEstimateResponse) {
          handleShowModal(QuoteShowModal.CONGRATS);
        }
      })
      .catch(() => showCommonError())
      .finally(() => setRequestInProgress(false));
  };

  const handleConfirmAppointment = async (data: RequestConfirmAppointment) => {
    if (!appId) {
      // error handling
      return;
    }

    confirmAppointment(appId, data)
      .then((resp: ResponseAppointment) => {
        dispatch(setAppointment(resp.data));
        handleShowModal(QuoteShowModal.NONE);
        callAdsBooking(resp.data);
        login(resp);
      })
      .catch(() => showCommonError())
      .finally(() => setRequestInProgress(false));
  };

  const handleConfirmCar = () => {
    mixPanel(MIXPANEL_TRACK.CONFIRM_CAR);

    if (appId) handleUpdateAppointment(grabInputData());
    else handleCreateAppointment();
  };

  /**
   * Rendering
   */
  const renderStepComponent = () => {
    return (
      (step === QuoteStep.QUOTE_SERVICE_DESK && (
        <ServiceDesk onContinue={() => handleContinueOnService()} />
      )) ||
      (step === QuoteStep.QUOTE_SEARCH_CAR && (
        <SearchCar onConfirm={handleConfirmCar} />
      )) ||
      (step === QuoteStep.QUOTE_CONTACT && <FormContact />) ||
      (step === QuoteStep.QUOTE_CONGRATS && <SimpleCongrats />) || (
        <Typography>Finish my booking here</Typography>
      )
    );
  };

  const getSplashText = () => {
    if (openSplash) {
      return isEstimateResponse || shouldBookEstimate
        ? 'Loading your estimate'
        : '';
    }

    return 'Creating your account';
  };

  return (
    <QuoteContext.Provider
      value={{
        step,
        handleSetStep,

        showModal,
        handleShowModal,

        staticServices,
        handleSetStaticServices,

        services,
        handleSetServices,

        reason,
        handleSetReason,

        car,
        handleSetCar,

        contact,
        handleSetContact,

        handleCreateAppointment,
        handleUpdateAppointment,
        handleConfirmAppointment,
        handleRespondAppointmentEstimate,

        clearAll,

        loggingIn,
        handleSetLoggingIn,

        urlReferer,

        isEstimateResponse,
        shouldBookEstimate,

        requestInProgress,
      }}
    >
      <Container className={classes.root}>
        <QuoteContainer currentStep={step} onStepChanged={handleStepChange}>
          {renderStepComponent()}
        </QuoteContainer>

        <Typography className="hidden">{display}</Typography>

        <ModalReviewQuote
          show={showModal === QuoteShowModal.REVIEW_QUOTE}
          onClose={() => handleShowModal(QuoteShowModal.NONE)}
        />
        <ModalScheduleService
          show={showModal === QuoteShowModal.SCHEDULE_SERVICE}
          onClose={() => handleShowModal(QuoteShowModal.NONE)}
        />
        <ModalFinishBooking
          show={showModal === QuoteShowModal.FINISH_BOOKING}
          onClose={() => handleShowModal(QuoteShowModal.NONE)}
        />
        <ModalCongrats
          show={showModal === QuoteShowModal.CONGRATS}
          onClose={() => handleShowModal(QuoteShowModal.NONE)}
        />
        <ModalContact
          show={showModal === QuoteShowModal.CONTACT}
          onClose={() => handleShowModal(QuoteShowModal.NONE)}
        />
        <ModalServiceIntro
          show={showModal === QuoteShowModal.SERVICE_INTRO}
          onClose={() => handleShowModal(QuoteShowModal.NONE)}
        />
        <ModalDecideEstimate
          show={showModal === QuoteShowModal.DECIDE_ESTIMATE_RESPONSE}
          onClose={() => handleShowModal(QuoteShowModal.NONE)}
        />
        <Splash show={loggingIn || openSplash} text={getSplashText()} />
        <ModalInputZip show={showZipModal} onGetQuote={handleSetZipFromModal} />
      </Container>
    </QuoteContext.Provider>
  );
};

export default Quote;
