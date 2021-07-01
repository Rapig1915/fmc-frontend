import { API_CALL_FAILURE, API_CALL_START, IReduxAction } from '../types';

export const setApiCallStart = (api: string): IReduxAction => ({
  type: API_CALL_START,
  payload: { api },
});

export const setApiCallFailure = (
  api: string,
  error: string
): IReduxAction => ({
  type: API_CALL_FAILURE,
  payload: { api, error },
});
