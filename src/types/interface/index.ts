// 请求响应的数据格式
export interface IResponseType<T = any> {
  code: string;
  data?: T;
  message?: string;
  success: boolean;
  timestamp?: string;
}
