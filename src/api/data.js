/**
 * 这里定义获取数据的 api
 */

import request from '@/utils/request'

// 获取数据概览
export const getStatisticsOverview = params => {
  return request({
    method: 'get',
    url: '/api/log/getStatisticsOverview',
    params
  })
}

// 获取数据分析
export const getStatisticsAnalysis = params => {
  return request({
    method: 'get',
    url: '/api/log/getStatisticsAnalysis',
    params
  })
}

// 获取用户操作
export const getUserOperation = params => {
  return request({
    method: 'get',
    url: '/api/log/getUserOperation',
    params
  })
}

// 获取用户数据
export const getUserData = params => {
  return request({
    method: 'get',
    url: '/api/log/getUserData',
    params
  })
}
