import { requestService } from '@/utils/modules/request';

// 测试请求
export function apiGetData(params?: any) {
  return requestService.get('/getData', params);
}

// 测试请求
export function apiGetDataPost(params?: any) {
  return requestService.post('/getData', params);
}

// 测试请求
export function apiUpload(params?: any) {
  return requestService.post('/upload', params);
}
