import { IAppointment } from 'src/types';

export const QUOTE_SET_ZIP = 'QUOTE_SET_ZIP';
export const QUOTE_SET_APPOINTMENT = 'QUOTE_SET_APPOINTMENT';

export interface IQuoteZipcodePayload {
  zip?: string;
  customer?: number;
}

export interface IQuoteAppointmentPayload {
  appointment: IAppointment;
}

export interface IQuoteState {
  zip: string;
  customer: number;
  appointment: IAppointment | null;
}
