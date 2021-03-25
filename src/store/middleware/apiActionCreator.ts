import { Dispatch, MiddlewareAPI } from 'redux';
import {
  API_CALL_FAILURE,
  API_CALL_START,
  API_CALL_SUCCESS,
  IReduxAction,
} from '../types';

const apiActionCreator = (api: MiddlewareAPI) => {
  const { dispatch } = api;

  return (next: Dispatch) => async (action: IReduxAction) => {
    const { apiCallData } = action;

    if (!action.isApiCall) {
      return next(action);
    }

    try {
      dispatch({
        type: API_CALL_START,
        payload: {
          api: action.type,
        },
      });

      const response = await apiCallData?.apiCall();

      dispatch({
        type: action.type,
        payload: {
          payload: action.payload,
          response,
        },
      });

      dispatch({
        type: API_CALL_SUCCESS,
        payload: {
          api: action.type,
        },
      });

      if (apiCallData?.cbSuccess) {
        apiCallData.cbSuccess();
      }

      return null;
    } catch (error) {
      dispatch({
        type: API_CALL_FAILURE,
        payload: {
          api: action.type,
          error: error.toString(),
        },
      });

      if (apiCallData?.cbFailure) {
        apiCallData.cbFailure();
      }

      return null;
    }
  };
};

export default apiActionCreator;
