import { IAppointment } from 'src/types';
import { IReduxAction, QUOTE_SET_APPOINTMENT, QUOTE_SET_ZIP } from '../types';

export const setZip = (zip: string, customer: number): IReduxAction => ({
  type: QUOTE_SET_ZIP,
  payload: { zip, customer },
});

export const setAppointment = (appointment: IAppointment): IReduxAction => ({
  type: QUOTE_SET_APPOINTMENT,
  payload: appointment,
});
