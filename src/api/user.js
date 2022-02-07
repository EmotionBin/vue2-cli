/**
 * 这里定义用户的 api
 */

import request from '@/utils/request'

// 获取数据概览
export const getLogUserList = params => {
  return request({
    method: 'get',
    url: '/api/log/getLogUserList',
    params
  })
}
