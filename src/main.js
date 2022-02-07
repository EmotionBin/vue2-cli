import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/check-auth'
import Element from 'element-ui'
import md5 from 'md5'
import './styles/index.scss'
import utils from '@/utils'
import '@/utils/vuex-persistence'

Vue.use(Element)

// 原型链挂载
Vue.prototype.$md5 = md5
Vue.prototype.$utils = utils

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
