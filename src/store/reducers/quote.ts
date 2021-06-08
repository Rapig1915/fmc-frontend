import { IAppointment } from 'src/types';
import {
  IQuoteState,
  IQuoteZipcodePayload,
  IReduxAction,
  QUOTE_SET_APPOINTMENT,
  QUOTE_SET_ZIP,
} from '../types';

const initialState: IQuoteState = {
  zip: '',
  customer: 0,
  appointment: null,
};

export default (
  state = initialState,
  action: IReduxAction
): typeof initialState => {
  switch (action.type) {
    case QUOTE_SET_ZIP:
      return {
        ...state,
        zip: (action.payload as IQuoteZipcodePayload).zip || state.zip,
        customer:
          (action.payload as IQuoteZipcodePayload).customer || state.customer,
      };
    case QUOTE_SET_APPOINTMENT:
      return {
        ...state,
        appointment: action.payload as IAppointment,
      };
    default:
      return state;
  }
};
