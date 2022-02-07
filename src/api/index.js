/**
 * 这里定义通用的 api
 */

import request from '@/utils/request'

// 登录
export const login = data => {
  return request({
    method: 'post',
    url: '/api/login',
    data
  })
}

// 查询天气
export const getWeather = params => {
  return request({
    method: 'get',
    url: '/api/getWeather',
    params
  })
}

// 查询位置
export const getLocation = data => {
  return request({
    method: 'get',
    url: '/api/getLocation',
    data
  })
}
