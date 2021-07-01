import {
  ResponseGetUserAppointments,
  ResponseGetUser,
  ResponseSignin,
  RequestSignin,
  RequestSignInAppointment,
  RequestAuth,
  ResponseAuth,
} from 'src/types';
import { callApi } from './request';

export const getToken = async (data: RequestAuth): Promise<ResponseAuth> => {
  return callApi<ResponseAuth>({
    url: `/api/v2/user/auth`,
    method: 'POST',
    data,
  });
};

export const signIn = async (
  data: RequestSignin | RequestSignInAppointment,
  appointmentMode = false
): Promise<ResponseSignin> => {
  return callApi<ResponseSignin>({
    url: !appointmentMode
      ? `/api/v2/user/sign_in`
      : `/api/v2/appointment/sign_in`,
    method: 'POST',
    data,
  });
};

export const getUser = async (): Promise<ResponseGetUser> => {
  return callApi<ResponseGetUser>({
    url: `/api/v2/user`,
    method: 'GET',
  });
};

export const getUserAppointments = async (
  status: string
): Promise<ResponseGetUserAppointments> => {
  return callApi<ResponseGetUserAppointments>({
    url: `/api/v2/user/appointments`,
    params: { status },
    method: 'GET',
  });
};
