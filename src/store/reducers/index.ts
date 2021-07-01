import { combineReducers } from 'redux';
import AuthReducer from './auth';
import ApiReducer from './api';
import QuoteReducer from './quote';

const reducers = {
  api: ApiReducer,
  auth: AuthReducer,
  quote: QuoteReducer,
};

export interface IReduxState {
  api: ReturnType<typeof ApiReducer>;
  auth: ReturnType<typeof AuthReducer>;
  quote: ReturnType<typeof QuoteReducer>;
}

export default combineReducers<IReduxState>(reducers);
