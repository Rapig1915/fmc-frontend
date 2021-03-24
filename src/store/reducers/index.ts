import { combineReducers } from 'redux';
import AuthReducer from './auth';
import ApiReducer from './api';

const reducers = {
  api: ApiReducer,
  auth: AuthReducer,
};

export interface IReduxState {
  api: ReturnType<typeof ApiReducer>;
  auth: ReturnType<typeof AuthReducer>;
}

export default combineReducers<IReduxState>(reducers);
