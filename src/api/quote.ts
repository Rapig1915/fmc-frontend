import {
  RequestCreateAppointment,
  RequestUpdateAppointmentTime,
  RequestUpdateAppointmentContact,
  RequestConfirmAppointment,
  ResponseAppointment,
  ResponseCheckPlateNumber,
  ResponseVehicle,
  ResponseZipcode,
  ResponseAvailability,
  ResponseAppointmentEstimate,
  RequestUpdateEstimateResponse,
  RequestUpdateEstimateService,
  ResponseEstimate,
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
    url: `/api/v2/vehicles`,
    params: {
      year,
      make,
      model,
    },
    method: 'GET',
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

export const getAppointment = async (
  id: string
): Promise<ResponseAppointment> => {
  return callApi<ResponseAppointment>({
    url: `/api/v1/appointments/${id}`,
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

export const updateAppointment = async (
  id: number,
  data:
    | RequestUpdateAppointmentTime
    | RequestUpdateAppointmentContact
    | RequestCreateAppointment
): Promise<ResponseAppointment> => {
  return callApi<ResponseAppointment>({
    url: `/api/v2/appointments/${id}`,
    method: 'PUT',
    data,
  });
};

export const updateAppointmentEstimate = async (
  id: number,
  data: RequestUpdateEstimateResponse
): Promise<ResponseAppointment> => {
  return callApi<ResponseAppointment>({
    url: `/api/v1/appointments/estimate_booking/${id}`,
    method: 'PATCH',
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

export const getEstimate = async (
  id: number | null
): Promise<ResponseAppointmentEstimate> => {
  return callApi<ResponseAppointmentEstimate>({
    url: `/api/v2/estimates/${id}`,
    method: 'GET',
  });
};

export const acceptEstimate = async (
  id: number | null
): Promise<ResponseAppointmentEstimate> => {
  return callApi<ResponseAppointmentEstimate>({
    url: `/api/v1/estimate_responses?estimate_response[estimate_id]=${id}`,
    method: 'POST',
  });
};

export const updateEstimateServiceStatus = async (
  id: number,
  data: RequestUpdateEstimateService
): Promise<ResponseEstimate> => {
  return callApi<ResponseEstimate>({
    url: `/api/v1/estimate_services/${id}`,
    method: 'PUT',
    data,
  });
};
