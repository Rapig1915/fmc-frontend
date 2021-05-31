import { API_CALL_FAILURE, API_CALL_START, IApiAction } from '../types';

export const setApiCallStart = (api: string): IApiAction => ({
  type: API_CALL_START,
  payload: { api },
});
export const setApiCallFailure = (api: string, error: string): IApiAction => ({
  type: API_CALL_FAILURE,
  payload: { api, error },
});
