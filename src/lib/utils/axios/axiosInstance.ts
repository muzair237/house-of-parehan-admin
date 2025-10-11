import axios, { AxiosInstance } from 'axios';

import { getCookie } from '../helper';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ORIGIN,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie(process.env.NEXT_PUBLIC_TOKEN_COOKIE!);

    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
