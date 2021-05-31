export const QUOTE_SET_ZIP = 'QUOTE_SET_ZIP';
export const QUOTE_SHOW_SPLASH = 'QUOTE_SHOW_SPLASH';

export interface IQuoteAction {
  type: string;
  payload: IQuoteActionPayload;
}

export interface IQuoteActionPayload {
  zip?: string;
  customer?: number;
}

export interface ISplashAction {
  type: string;
  payload: ISplashActionPayload;
}

export interface ISplashActionPayload {
  show?: boolean;
}

export interface IQuoteState {
  zip: string;
  customer: number;
  splash: boolean;
}
