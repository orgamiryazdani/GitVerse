import { API_URL } from '@/configs/global';
import { ApiError } from '@/types/http-errors.interface';
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { errorHandler, networkErrorStrategy } from './http-error-strategies';
import { getSession } from 'next-auth/react';

const httpService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpService.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session?.user?.accessToken) {
      config.headers.Authorization = `token ${session.user.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response) {
      const statusCode = error?.response?.status;
      if (statusCode >= 400) {
        const errorData: ApiError = error.response?.data;

        errorHandler[statusCode](errorData);
      }
    } else {
      networkErrorStrategy();
    }
  }
);

async function apiBase<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
  const response: AxiosResponse = await httpService(url, options);
  return response.data as T;
}

async function readData<T>(url: string, headers?: AxiosRequestHeaders): Promise<T> {
  const options: AxiosRequestConfig = {
    headers: headers,
    method: 'GET',
  };

  return await apiBase<T>(url, options);
}

async function createData<TModel, TResult>(url: string, data: TModel, headers?: AxiosRequestHeaders): Promise<TResult> {
  const options: AxiosRequestConfig = {
    method: 'POST',
    headers: headers,
    data: JSON.stringify(data),
  };

  return await apiBase<TResult>(url, options);
}

async function updateData<TModel, TResult>(url: string, data: TModel, headers?: AxiosRequestHeaders): Promise<TResult> {
  const options: AxiosRequestConfig = {
    method: 'PUT',
    headers: headers,
    data: JSON.stringify(data),
  };

  return await apiBase<TResult>(url, options);
}

async function deleteData(url: string, headers?: AxiosRequestHeaders): Promise<void> {
  const options: AxiosRequestConfig = {
    method: 'DELETE',
    headers: headers,
  };

  return await apiBase(url, options);
}

export { createData, readData, updateData, deleteData };
