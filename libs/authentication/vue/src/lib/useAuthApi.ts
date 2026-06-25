import axios, { type AxiosInstance } from 'axios';

import { getToken } from './auth.const';

export const apiNoAuth = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

const createApi = (baseURL: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
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

let cachedApi: AxiosInstance = null;

export function useAuthApi() {
  if (!cachedApi) {
    throw new Error('first create the auth api with `createAuthApi`');
  }

  return cachedApi;
}

export const createAuthApi = (baseUrl: string) => {
  if (cachedApi) {
    console.warn('Use cached API, authApi is already initialized ');
    return cachedApi;
  }

  cachedApi = createApi(baseUrl);

  return cachedApi;
};
