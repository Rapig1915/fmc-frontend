export interface IReduxAction {
  type: string;
  payload: unknown;

  // Asynchronous API calls
  isApiCall?: boolean;
  apiCallData?: {
    apiCall: () => void;
    cbSuccess: () => void;
    cbFailure: () => void;
  };
}
