import React from 'react';
import { QuoteShowModal, QuoteStep } from 'src/types';

export interface IQuoteReason {
  reasonId: number;
  reason: string;
  subReason: string;
  otherReason: string;
  note: string;
}

export interface IQuoteContext {
  step: QuoteStep;
  handleSetStep: (newStep: QuoteStep) => void;

  showModal: QuoteShowModal;
  handleShowModal: (newStep: QuoteShowModal) => void;

  services: string[];
  handleSetServices: (services: string[]) => void;

  reason: IQuoteReason;
  handleSetReason: (newReason: IQuoteReason) => void;
}

export const QuoteContext = React.createContext<IQuoteContext>({
  step: QuoteStep.QUOTE_SERVICE_DESK,
  handleSetStep: () => {},

  showModal: QuoteShowModal.NONE,
  handleShowModal: () => {},

  services: [],
  handleSetServices: () => {},

  reason: {
    reasonId: 0,
    reason: '',
    subReason: '',
    otherReason: '',
    note: '',
  },
  handleSetReason: () => {},
});
