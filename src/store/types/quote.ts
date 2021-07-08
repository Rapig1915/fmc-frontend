import { IAppointment } from 'src/types';

export const QUOTE_SET_ZIP = 'QUOTE_SET_ZIP';
export const QUOTE_SET_APPOINTMENT = 'QUOTE_SET_APPOINTMENT';
export const ESTIMATE_ITEM_STATUS = 'ESTIMATE_ITEM_STATUS';

export interface IQuoteZipcodePayload {
  zip?: string;
  customer?: number;
}

export interface IQuoteAppointmentPayload {
  appointment: IAppointment;
}

export interface EstimateItemStatusPayload {
  s: string;
  status: string;
}

export interface IQuoteState {
  zip: string;
  customer: number;
  appointment: IAppointment | null;
}
