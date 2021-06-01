import { ResponseVehicle, ResponseZipcode } from 'src/types';
import { callApi } from './request';

export const getHappyCustomer = async (
  zip: string
): Promise<ResponseZipcode> => {
  return callApi<ResponseZipcode>({
    url: '/api/v1/appointments/zip_code',
    // url: '/api/sample',
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
    // url: '/api/vehicles',
    method: 'GET',
    data: {
      year: year || '',
      make: make || '',
      model: model || '',
    },
  });
};
