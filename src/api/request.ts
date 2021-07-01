import axios, { AxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import { apiBaseUrl } from 'src/utils/config';
import logger from 'src/utils/logger';
import { store } from 'src/store';
import { IReduxState } from 'src/store/reducers';

axios.defaults.baseURL = apiBaseUrl;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const callApi = async <T>(apiConfig: AxiosRequestConfig): Promise<T> => {
  try {
    const state: IReduxState = store.getState();
    const authToken = get(state, 'auth.token');
    const headers = {
      Accept: 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : null,
    };

    const response = await axios.request({
      baseURL: apiBaseUrl,
      headers,
      ...apiConfig,
    });
    return response.data;
  } catch (error) {
    logger.error(error);
    return Promise.reject(error);
  }
};

export default callApi;
