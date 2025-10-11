import { AxiosRequestConfig, AxiosResponse } from 'axios';

import axiosInstance from './axiosInstance';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

class HttpClient {
  static async get<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await axiosInstance.get(url, config);
    return response.data;
  }

  static async post<TBody, TResponse>(
    url: string,
    body: TBody,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await axiosInstance.post(url, body, config);
    return response.data;
  }

  static async put<TBody, TResponse>(
    url: string,
    body: TBody,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await axiosInstance.put(url, body, config);
    return response.data;
  }

  static async patch<TBody, TResponse>(
    url: string,
    body: TBody,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await axiosInstance.patch(url, body, config);
    return response.data;
  }

  static async delete<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await axiosInstance.delete(url, {
      ...config,
    });
    return response.data;
  }

  static async upload<TResponse>(
    url: string,
    method: HttpMethod,
    formData: FormData,
    config?: AxiosRequestConfig
  ): Promise<TResponse> {
    const response: AxiosResponse<TResponse> = await axiosInstance.request({
      url,
      method,
      data: formData,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
      ...config,
    });

    return response.data;
  }
}

export default HttpClient;
