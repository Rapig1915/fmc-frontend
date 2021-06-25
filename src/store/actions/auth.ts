import { IUser } from 'src/types';
import {
  IReduxAction,
  AUTH_SET_CODE,
  AUTH_SET_TOKEN,
  AUTH_SET_USER,
  AUTH_LOGOUT,
} from '../types';

export const setAuthCode = (code: string): IReduxAction => ({
  type: AUTH_SET_CODE,
  payload: { code },
});

export const setAuthToken = (
  token: string,
  userId: number,
  email: string
): IReduxAction => ({
  type: AUTH_SET_TOKEN,
  payload: { token, userId, email },
});

export const setUser = (user: IUser): IReduxAction => ({
  type: AUTH_SET_USER,
  payload: user,
});

export const logout = (): IReduxAction => ({
  type: AUTH_LOGOUT,
  payload: null,
});
