import {
  IQuoteAction,
  ISplashAction,
  QUOTE_SET_ZIP,
  QUOTE_SHOW_SPLASH,
} from '../types';

export const showSplash = (show: boolean): ISplashAction => ({
  type: QUOTE_SHOW_SPLASH,
  payload: { show },
});

export const setZip = (zip: string, customer: number): IQuoteAction => ({
  type: QUOTE_SET_ZIP,
  payload: { zip, customer },
});
