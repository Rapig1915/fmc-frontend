import { IUser } from 'src/types';
import { IReduxAction, IAuthSetCodePayload } from '../types';
import {
  AUTH_LOGOUT,
  AUTH_SET_CODE,
  AUTH_SET_TOKEN,
  AUTH_SET_USER,
  IAuthSetTokenPayload,
} from '../types/auth';

const initialState = {
  userId: 0,
  email: '',
  user: null as IUser | null,
  code: '',
  token: '',
  loggedIn: false,
};

export default (
  state = initialState,
  action: IReduxAction
): typeof initialState => {
  switch (action.type) {
    case AUTH_LOGOUT:
      return initialState;
    case AUTH_SET_CODE:
      return {
        ...state,
        code: (action.payload as IAuthSetCodePayload).code || '',
      };
    case AUTH_SET_TOKEN:
      return {
        ...state,
        loggedIn: true,
        token: (action.payload as IAuthSetTokenPayload).token,
        userId: (action.payload as IAuthSetTokenPayload).userId,
        email: (action.payload as IAuthSetTokenPayload).email,
      };
    case AUTH_SET_USER:
      return {
        ...state,
        user: action.payload as IUser,
      };
    default:
      return state;
  }
};
