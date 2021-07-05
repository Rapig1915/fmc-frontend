import React, { ReactElement, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
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
} from 'src/types';
import {
  confirmAppointment,
  createAppointment,
  getHappyCustomer,
  updateAppointment,
} from 'src/api/quote';
import { IReduxState } from 'src/store/reducers';
import { setAppointment, setAuthToken, setZip } from 'src/store/actions';
import { Splash } from 'src/layouts/components';
import mixPanel from 'src/utils/mixpanel';
import { MIXPANEL_TRACK, URL } from 'src/utils/consts';
import { signIn } from 'src/api/auth';

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

  const zip = useSelector((state: IReduxState) => state.quote.zip);
  const user = useSelector((state: IReduxState) => state.auth.user);
  const location = useLocation();

  const params = queryString.parse(location.search);
  const zipQuery = Array.isArray(params.zip) ? params.zip[0] || '' : params.zip;
  const urlReferer = Array.isArray(params.referer)
    ? params.referer[0] || ''
    : params.referer || '';

  const [openSplash, setOpenSplash] = React.useState(false);

  useEffect(() => {
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
  }, [zipQuery, urlReferer, dispatch, history, zip]);

  const showZipModal = !zip && !zipQuery;

  const handleSetZipFromModal = (payload: {
    zip?: string;
    customer?: number;
  }) => {
    if (payload.zip) {
      mixPanel(MIXPANEL_TRACK.ZIP);
      dispatch(setZip(payload.zip || '', payload.customer || 0));
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
    (location.state && location.state.modal) || QuoteShowModal.NONE
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
    reasonId: 0,
    reason: '',
    subReason: [],
    otherReason: '',
    note: '',
  });

  const isNotSureFunnel =
    reason && reason.reasonId && reason.reason && reason.subReason.length;

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
    },
  });
  const handleSetCar = useCallback((newCar: IQuoteCar) => setCar(newCar), []);

  const [contact, setContact] = useState<IQuoteContact>({
    name: (user && user.attributes.name) || '',
    email: (user && user.attributes.email) || '',
    password: '',
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

        if (isNotSureFunnel) {
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
      reasonId: 0,
      reason: '',
      subReason: [],
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
      },
    });

    handleSetContact({
      name: '',
      email: '',
      password: '',
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

  const handleContinueOnService = () => {
    handleStepChange(QuoteStep.QUOTE_SEARCH_CAR, true);
  };

  const grabInputData = (): RequestCreateAppointment => {
    let diagInput =
      reason.subReason[0] === 'Other'
        ? reason.otherReason
        : reason.subReason.join('. ');

    if (reason.note !== '') {
      diagInput += `. ${reason.note}`;
    }

    return {
      appointment_type: isNotSureFunnel ? 'diagnosis' : 'repair',
      car_attributes: {
        ...car.attributes,
      },
      tracking_attributes: {
        utm_source: '',
        utm_medium: '',
        utm_term: '',
        utm_content: '',
        utm_campaign: '',
        gclid: '',
      },
      location_attributes: {
        zip,
      },
      address: zip,
      diagnosis_input: diagInput,
      services: [...services, ...staticServices],
      category_selected: reason.reason,
    };
  };

  const handleCreateAppointment = async () => {
    const resp: ResponseAppointment = await createAppointment(grabInputData());

    if (!resp || !resp.data) {
      // error handling
      return;
    }

    dispatch(setAppointment(resp.data));

    if (isNotSureFunnel) {
      handleShowModal(QuoteShowModal.CONTACT);
    } else {
      handleStepChange(QuoteStep.QUOTE_CONTACT, true);
    }
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

    const resp: ResponseAppointment = await updateAppointment(appId, data);

    if (!resp || !resp.data) {
      // error handling
      return;
    }

    dispatch(setAppointment(resp.data));

    if (isNotSureFunnel || urlReferer === URL.DASHBOARD) {
      if (!contact || !contact.name || !contact.email || !contact.phone)
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
  };

  const handleConfirmAppointment = async (data: RequestConfirmAppointment) => {
    if (!appId) {
      // error handling
      return;
    }

    const resp: ResponseAppointment = await confirmAppointment(appId, data);

    if (!resp || !resp.data) {
      // error handling
      return;
    }

    dispatch(setAppointment(resp.data));
    handleShowModal(QuoteShowModal.NONE);
    login(resp);
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

        clearAll,

        loggingIn,
        handleSetLoggingIn,

        urlReferer,
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
        <Splash
          show={loggingIn || openSplash}
          text={openSplash ? '' : 'Logging you in'}
        />
        <ModalInputZip show={showZipModal} onGetQuote={handleSetZipFromModal} />
      </Container>
    </QuoteContext.Provider>
  );
};

export default Quote;
