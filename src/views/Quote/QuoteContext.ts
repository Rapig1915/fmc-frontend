import React from 'react';
import {
  QuoteShowModal,
  QuoteStep,
  RequestConfirmAppointment,
  RequestUpdateAppointmentTime,
  RequestUpdateAppointmentContact,
} from 'src/types';

export interface IQuoteReason {
  reasonId: number;
  reason: string;
  subReason: string[];
  otherReason: string;
  note: string;
}

export interface IQuoteCar {
  search: {
    plate_number: string;
    state: string;
  };
  attributes: {
    year: string;
    make: string;
    model: string;
    engine_size: string;
    mileage: string;
    vin: string;
  };
}

export interface IQuoteContact {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IQuoteContext {
  step: QuoteStep;
  handleSetStep: (newStep: QuoteStep) => void;

  showModal: QuoteShowModal;
  handleShowModal: (newStep: QuoteShowModal) => void;

  staticServices: string[];
  handleSetStaticServices: (services: string[]) => void;

  services: string[];
  handleSetServices: (services: string[]) => void;

  reason: IQuoteReason;
  handleSetReason: (newReason: IQuoteReason) => void;

  car: IQuoteCar;
  handleSetCar: (newCar: IQuoteCar) => void;

  contact: IQuoteContact;
  handleSetContact: (newContact: IQuoteContact) => void;

  handleCreateAppointment: () => void;
  handleUpdateAppointment: (
    data: RequestUpdateAppointmentTime | RequestUpdateAppointmentContact
  ) => void;
  handleConfirmAppointment: (data: RequestConfirmAppointment) => void;

  clearAll: () => void;

  loggingIn: boolean;
  handleSetLoggingIn: (state: boolean) => void;

  urlReferer: string;
}

export const QuoteContext = React.createContext<IQuoteContext>({
  step: QuoteStep.QUOTE_SERVICE_DESK,
  handleSetStep: () => {},

  showModal: QuoteShowModal.NONE,
  handleShowModal: () => {},

  staticServices: [],
  handleSetStaticServices: () => {},

  services: [],
  handleSetServices: () => {},

  reason: {
    reasonId: 0,
    reason: '',
    subReason: [],
    otherReason: '',
    note: '',
  },
  handleSetReason: () => {},

  car: {
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
  },
  handleSetCar: () => {},

  contact: {
    name: '',
    email: '',
    password: '',
    phone: '',
  },
  handleSetContact: () => {},

  handleCreateAppointment: () => {},
  handleUpdateAppointment: () => {},
  handleConfirmAppointment: () => {},

  clearAll: () => {},

  loggingIn: false,
  handleSetLoggingIn: () => {},

  urlReferer: '',
});
