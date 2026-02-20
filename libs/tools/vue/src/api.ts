import axios, { type AxiosInstance, AxiosRequestInterceptorUse } from 'axios';

import { getRuntimeConfig } from './runtime.config';

const createApi = () => {
  const api = axios.create({
    baseURL: getRuntimeConfig().API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const inverterId = localStorage.getItem('active-invertor-id');
    if (inverterId) {
      config.headers['X-Inverter-Id'] = inverterId;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );

  return api;
};

let cachedApi: AxiosInstance;
export type HttpRequest<T> = typeof cachedApi;

export function useApi() {
  if (!cachedApi) {
    cachedApi = createApi();
  }

  return cachedApi;
}
