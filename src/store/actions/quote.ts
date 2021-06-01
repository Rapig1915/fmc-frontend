import { IReduxAction, QUOTE_SET_ZIP } from '../types';

export const setZip = (zip: string, customer: number): IReduxAction => ({
  type: QUOTE_SET_ZIP,
  payload: { zip, customer },
});

export const setX = 0;
