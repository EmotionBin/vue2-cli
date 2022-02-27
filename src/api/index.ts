import { requestService } from '@/utils/modules/request';

// 测试请求
export function apiGetData(params: any): Promise<any> {
  return requestService.get('/aaa', params);
}
