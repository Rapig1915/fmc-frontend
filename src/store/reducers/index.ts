import { combineReducers } from 'redux';
import AuthReducer from './auth';

const reducers = {
  auth: AuthReducer,
};

export interface IReduxState {
  auth: ReturnType<typeof AuthReducer>;
}

export default combineReducers<IReduxState>(reducers);
