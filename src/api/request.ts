import axios, { AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from 'src/utils/config';
import logger from 'src/utils/logger';

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const callApi = async (
  apiConfig: AxiosRequestConfig
): Promise<unknown> => {
  try {
    const response = await axios.request(apiConfig);
    return response.data;
  } catch (error) {
    logger.error(error);
  }

  return null;
};

export default callApi;
