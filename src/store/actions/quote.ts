import { IAppointment } from 'src/types';
import {
  IReduxAction,
  QUOTE_SET_APPOINTMENT,
  QUOTE_SET_ZIP,
  ESTIMATE_ITEM_STATUS,
} from '../types';

export const setZip = (zip: string, customer: number): IReduxAction => ({
  type: QUOTE_SET_ZIP,
  payload: { zip, customer },
});

export const setAppointment = (
  appointment: IAppointment | null
): IReduxAction => ({
  type: QUOTE_SET_APPOINTMENT,
  payload: appointment,
});

export const estimateItemStatus = (
  s: string,
  status: string
): IReduxAction => ({
  type: ESTIMATE_ITEM_STATUS,
  payload: { s, status },
});
