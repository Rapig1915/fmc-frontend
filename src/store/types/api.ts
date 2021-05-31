export const API_CALL_START = 'API_CALL_START';
export const API_CALL_SUCCESS = 'API_CALL_FINISH';
export const API_CALL_FAILURE = 'API_CALL_FAILURE';

export interface IApiActionPayload {
  api: string;
  error?: string;
}

export interface IApiAction {
  type: string;
  payload: IApiActionPayload;
}

export interface IApiState {
  [type: string]: {
    inProgress: boolean;
    error: string;
  };
}
