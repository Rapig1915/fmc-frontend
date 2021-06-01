import { IQuoteActionPayload, IReduxAction, QUOTE_SET_ZIP } from '../types';

const initialState = {
  zip: '',
  customer: 0,
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
    default:
      return state;
  }
};
