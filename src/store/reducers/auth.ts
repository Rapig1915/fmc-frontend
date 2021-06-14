import { IAppointment, IUser } from 'src/types';
import { IReduxAction, IAuthSetCodePayload } from '../types';
import {
  AUTH_LOGOUT,
  AUTH_SET_CODE,
  AUTH_SET_TOKEN,
  AUTH_SET_USER,
  AUTH_SET_USER_APPOINTMENTS,
  IAuthSetTokenPayload,
} from '../types/auth';

const initialState = {
  userId: 0,
  email: '',
  user: null as IUser | null,
  code: '',
  token: '',
  appointments: [] as IAppointment[],
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
    case AUTH_SET_USER_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload as IAppointment[],
      };
    default:
      return state;
  }
};
