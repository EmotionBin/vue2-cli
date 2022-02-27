// 这里封装请求
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IResponseType } from '@/typings';
import { Message } from 'element-ui';
import { REQUEST_FAIL_TIPS, REQUEST_BASE_URL } from '@/constants';

// 请求拦截器
function requestInterceptor(config: AxiosRequestConfig) {
  return config;
}

// 响应拦截器
function responseInterceptor(response: AxiosResponse<IResponseType>) {
  const resConfig = response.config as IResponseType;
  const { code, data, message = REQUEST_FAIL_TIPS, success } = resConfig;
  if (!success) {
    // 请求失败
    Message({
      message,
      type: 'error',
      duration: 3 * 1000,
    });
  }
  return { code, data, message, success };
}

// 创建 axios 实例
function createService(baseUrl?: string) {
  const service = axios.create({
    baseURL: baseUrl || '/',
    withCredentials: true, // 跨域请求携带 cookie 信息
    timeout: 30000,
  });
  service.interceptors.request.use(requestInterceptor);
  service.interceptors.response.use(responseInterceptor);
  return {
    get<T = any>(url: string, data?: T, options?: AxiosRequestConfig) {
      return service.get(url, {
        params: data,
        ...options,
      });
    },
    post<T = any>(url: string, data?: T, options?: AxiosRequestConfig) {
      return service.post(url, {
        params: data,
        ...options,
      });
    },
  };
}

export const requestService = createService(REQUEST_BASE_URL);
