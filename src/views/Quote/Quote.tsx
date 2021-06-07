import { Container, makeStyles, Typography } from '@material-ui/core';
import React, { ReactElement, useCallback, useState } from 'react';
import { QuoteShowModal, QuoteStep } from 'src/types';
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
import { IQuoteReason, QuoteContext } from './QuoteContext';

const useStyles = makeStyles(() => ({
  root: {},
}));

const Quote = (): ReactElement => {
  const classes = useStyles();

  /**
   * Quote Context
   */
  const [step, setStep] = useState(QuoteStep.QUOTE_SERVICE_DESK);
  const handleSetStep = useCallback(
    (newStep: QuoteStep) => setStep(newStep),
    []
  );

  const [showModal, setShowModal] = useState(QuoteShowModal.NONE);
  const handleShowModal = useCallback(
    (newShowModal: QuoteShowModal) => setShowModal(newShowModal),
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
    subReason: '',
    otherReason: '',
    note: '',
  });
  const handleSetReason = useCallback(
    (newReason: IQuoteReason) => setReason(newReason),
    []
  );

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
    handleShowModal(QuoteShowModal.CONTACT);
  };

  /**
   * Rendering
   */
  const renderStepComponent = () => {
    return (
      (step === QuoteStep.QUOTE_SEARCH_CAR && (
        <SearchCar onConfirm={() => handleConfirmCar()} />
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

        services,
        handleSetServices,

        reason,
        handleSetReason,
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
