import {
  RequestCreateAppointment,
  RequestUpdateAppointmentTime,
  RequestConfirmAppointment,
  ResponseAppointment,
  ResponseCheckPlateNumber,
  ResponseVehicle,
  ResponseZipcode,
  ResponseAvailability,
} from 'src/types';
import { callApi } from './request';

export const getHappyCustomer = async (
  zip: string
): Promise<ResponseZipcode> => {
  return callApi<ResponseZipcode>({
    url: '/api/v1/appointments/zip_code',
    method: 'POST',
    data: {
      zip_code: zip,
    },
  });
};

export const getVehicles = async (
  year: string,
  make: string | undefined,
  model: string | undefined
): Promise<ResponseVehicle> => {
  return callApi<ResponseVehicle>({
    url: '/api/v2/vehicles',
    method: 'GET',
    data: {
      year: year || '',
      make: make || '',
      model: model || '',
    },
  });
};

export const checkPlateNumber = async (
  plate: string,
  state: string
): Promise<ResponseCheckPlateNumber> => {
  return callApi<ResponseCheckPlateNumber>({
    url: `/api/v2/vehicles/plate/${plate}/${state}`,
    method: 'GET',
  });
};

export const checkAvailability = async (
  id: number
): Promise<ResponseAvailability> => {
  return callApi<ResponseAvailability>({
    url: `/api/v2/availability/${id}`,
    method: 'GET',
  });
};

export const createAppointment = async (
  data: RequestCreateAppointment
): Promise<ResponseAppointment> => {
  return callApi<ResponseAppointment>({
    url: `/api/v2/appointments`,
    method: 'POST',
    data,
  });
};

export const updateAppointmentTime = async (
  id: number,
  data: RequestUpdateAppointmentTime
): Promise<ResponseAppointment> => {
  return callApi<ResponseAppointment>({
    url: `/api/v2/appointments/${id}`,
    method: 'PUT',
    data,
  });
};

export const confirmAppointment = async (
  id: number,
  data: RequestConfirmAppointment
): Promise<ResponseAppointment> => {
  return callApi<ResponseAppointment>({
    url: `/api/v2/appointments/confirm/${id}`,
    method: 'POST',
    data,
  });
};
