import {
  API_CALL_FAILURE,
  API_CALL_START,
  API_CALL_SUCCESS,
  IApiActionPayload,
  IApiState,
  IReduxAction,
} from '../types';

const initialState: IApiState = {};

export default (state = initialState, action: IReduxAction): IApiState => {
  const payload = action.payload as IApiActionPayload;

  switch (action.type) {
    case API_CALL_START: {
      return {
        ...state,
        [payload.api]: {
          inProgress: true,
          error: '',
        },
      };
    }
    case API_CALL_SUCCESS: {
      return {
        ...state,
        [payload.api]: {
          inProgress: false,
          error: '',
        },
      };
    }
    case API_CALL_FAILURE: {
      return {
        ...state,
        [payload.api]: {
          inProgress: false,
          error: payload.error || 'Unknown',
        },
      };
    }
    default:
      return state;
  }
};
