import {
  IQuoteActionPayload,
  IReduxAction,
  ISplashActionPayload,
  QUOTE_SET_ZIP,
  QUOTE_SHOW_SPLASH,
} from '../types';

const initialState = {
  zip: '',
  customer: 0,
  splash: false,
};

export default (
  state = initialState,
  action: IReduxAction
): typeof initialState => {
  switch (action.type) {
    case QUOTE_SET_ZIP:
      return {
        ...state,
        zip: (action.payload as IQuoteActionPayload).zip || state.zip,
        customer:
          (action.payload as IQuoteActionPayload).customer || state.customer,
      };
    case QUOTE_SHOW_SPLASH:
      return {
        ...state,
        splash: (action.payload as ISplashActionPayload).show || false,
      };
    default:
      return state;
  }
};
