/**
 * 获取 cookie 中的 uuid 并检测 检测成功则自动登录
 */
import request from '@/utils/request'
import store from '@/store'

const cookie = document.cookie
const cookieItem = cookie.indexOf(';') === -1 ? [cookie] : cookie.split(';')
const obj = {}
cookieItem.forEach(item => {
  if (item) {
    const key = item.split('=')[0].trim()
    const value = item.split('=')[1].trim()
    obj[key] = value
  }
})
// 获取 uuid
const uuid = obj['web-chat-uuid']
console.log('uuid: ', uuid)
if (uuid) {
  // 写入 token 这里一定要先写入 因为这里是异步的 请求结束后再写入会影响到 页面切换的 auth 对 uuid 进行判断
  window.localStorage.setItem('uuid', uuid)
  // 检测 uuid
  request({
    method: 'get',
    url: '/api/uuidCheck',
    params: {
      uuid
    }
  }).then(({ data }) => {
    // vuex 写入用户信息
    store.commit('user/updateUser', data.userInfo)
    // 将 uuid 写入 cookie 中
    document.cookie = `web-chat-uuid = ${data.uuid};path=/`
  }).catch(error => {
    console.log('验证用户 uuid 时发生了错误', error)
    window.localStorage.removeItem('uuid')
  })
}
