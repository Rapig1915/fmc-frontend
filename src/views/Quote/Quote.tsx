import { useDispatch, useSelector } from 'react-redux';
import {
  // useHistory,
  useLocation,
} from 'react-router-dom';
import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { ReactElement, useCallback, useState } from 'react';
import {
  QuoteShowModal,
  QuoteStep,
  RequestConfirmAppointment,
  RequestCreateAppointment,
  RequestUpdateAppointmentTime,
  RequestUpdateAppointmentContact,
  ResponseAppointment,
} from 'src/types';
import {
  confirmAppointment,
  createAppointment,
  updateAppointment,
} from 'src/api/quote';
import { IReduxState } from 'src/store/reducers';
import { setAppointment } from 'src/store/actions';
// import { URL } from 'src/utils/consts';

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

const useStyles = makeStyles(() => ({
  root: {},
}));

const Quote = (): ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const history = useHistory();

  const zip = useSelector((state: IReduxState) => state.quote.zip);
  const location = useLocation();

  // if (!zip) {
  //   history.push(URL.HOME);
  // }

  const appId = useSelector(
    (state: IReduxState) =>
      state.quote.appointment && state.quote.appointment.id
  );

  /**
   * Quote Context
   */
  const [step, setStep] = useState(QuoteStep.QUOTE_SERVICE_DESK);
  const handleSetStep = useCallback(
    (newStep: QuoteStep) => setStep(newStep),
    []
  );

  const [showModal, setShowModal] = useState(
    (location.state && location.state.modal) || QuoteShowModal.NONE
  );
  const handleShowModal = useCallback(
    (newShowModal: QuoteShowModal) => setShowModal(newShowModal),
    []
  );

  const [staticServices, setStaticServices] = useState<string[]>([]);
  const handleSetStaticServices = useCallback(
    (newServices: string[]) => setStaticServices(newServices),
    []
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
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleSetContact = useCallback(
    (newContact: IQuoteContact) => setContact(newContact),
    []
  );

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

  const grabInputData = (): RequestCreateAppointment => {
    return {
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
      diagnosis_input:
        reason.subReason[0] === 'Other'
          ? reason.otherReason
          : reason.subReason.join(','),
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
    handleShowModal(QuoteShowModal.CONTACT);
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

    if (!contact || !contact.name || !contact.email || !contact.phone)
      handleShowModal(QuoteShowModal.CONTACT);
    else if (showModal === QuoteShowModal.SCHEDULE_SERVICE)
      handleShowModal(QuoteShowModal.FINISH_BOOKING);
    else if (showModal === QuoteShowModal.REVIEW_QUOTE)
      handleShowModal(QuoteShowModal.SCHEDULE_SERVICE);
    else handleShowModal(QuoteShowModal.REVIEW_QUOTE);
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
    // handleShowModal(QuoteShowModal.CONGRATS);
  };

  /**
   * Event Handlers
   */
  const handleStepChange = (newStep: QuoteStep, bForce?: boolean): void => {
    if (
      bForce ||
      parseInt(newStep as string, 10) <= parseInt(step as string, 10)
    )
      handleSetStep(newStep);
  };

  const handleConfirmCar = () => {
    if (appId) handleUpdateAppointment(grabInputData());
    else handleCreateAppointment();
  };

  /**
   * Rendering
   */
  const renderStepComponent = () => {
    return (
      (step === QuoteStep.QUOTE_SEARCH_CAR && (
        <SearchCar onConfirm={handleConfirmCar} />
      )) ||
      (step === QuoteStep.QUOTE_SERVICE_DESK && (
        <ServiceDesk
          onContinue={() => handleStepChange(QuoteStep.QUOTE_SEARCH_CAR, true)}
        />
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
      }}
    >
      <Container className={classes.root}>
        <QuoteContainer currentStep={step} onStepChanged={handleStepChange}>
          {renderStepComponent()}
        </QuoteContainer>

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
      </Container>
    </QuoteContext.Provider>
  );
};

export default Quote;
