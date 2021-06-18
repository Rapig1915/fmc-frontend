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

export const getUser = async (token: string): Promise<ResponseGetUser> => {
  return callApi<ResponseGetUser>(
    {
      url: `/api/v2/user`,
      method: 'GET',
    },
    token
  );
};

export const getUserAppointments = async (
  token: string,
  status: string
): Promise<ResponseGetUserAppointments> => {
  return callApi<ResponseGetUserAppointments>(
    {
      url: `/api/v2/user/appointments?status=${status}`,
      method: 'GET',
    },
    token
  );
};
