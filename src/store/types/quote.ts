export const QUOTE_SET_ZIP = 'QUOTE_SET_ZIP';

export interface IQuoteActionPayload {
  zip?: string;
  customer?: number;
}

export interface IQuoteState {
  zip: string;
  customer: number;
  splash: boolean;
}
