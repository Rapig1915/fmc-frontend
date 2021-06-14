import { IAppointment, IUser } from 'src/types';

export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_SET_CODE = 'AUTH_SET_CODE';
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';
export const AUTH_SET_USER = 'AUTH_SET_USER';
export const AUTH_SET_USER_APPOINTMENTS = 'AUTH_SET_USER_APPOINTMENTS';

export interface IAuthSetCodePayload {
  code?: string;
}

export interface IAuthSetTokenPayload {
  token: string;
  userId: number;
  email: string;
}

export interface IAuthState {
  user: IUser | undefined | null;
  userId: number;
  email: string;
  code: string;
  token: string;
  appointments: IAppointment[];
  loggedIn: boolean;
}
