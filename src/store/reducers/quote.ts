import { IAppointment } from 'src/types';
import {
  IQuoteState,
  IQuoteZipcodePayload,
  EstimateItemStatusPayload,
  IReduxAction,
  QUOTE_SET_APPOINTMENT,
  QUOTE_SET_ZIP,
  ESTIMATE_ITEM_STATUS,
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
    case ESTIMATE_ITEM_STATUS: {
      const appt = state.appointment;
      Object.assign(state.appointment, appt);
      const { s, status } = action.payload as EstimateItemStatusPayload;

      if (appt?.attributes.estimate?.services) {
        appt.attributes.estimate.services[s].status = status;
      }

      return {
        ...state,
        appointment: appt,
      };
    }
    default:
      return state;
  }
};
