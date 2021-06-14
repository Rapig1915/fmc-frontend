import axios, { AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from 'src/utils/config';
import logger from 'src/utils/logger';

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const callApi = async <T>(
  apiConfig: AxiosRequestConfig,
  token = ''
): Promise<T> => {
  try {
    if (token) axios.defaults.headers.Authorization = `Bearer ${token}`;

    const response = await axios.request(apiConfig);
    return response.data;
  } catch (error) {
    logger.error(error);
    return Promise.reject(error);
  }
};

export default callApi;
