import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 ElementUI 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局 less 样式
import '@/assets/css/global.less'
// 导入Cookie.js
import { delCookie } from '@/plugin/Cookie'
// 导入 vuex
import store from './store'

Vue.prototype.$delCookie = delCookie

// 将 ElementUI 注册为全局插件
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.filter('number_ch', (value) => {
  const arr = [' 百', ' 千', ' 万', ' 亿']
  value = value.toString()
  if (value.length === 3) {
    return value.substr(0, 1) + arr[0]
  } else if (value.length === 4) {
    return value.substr(0, 1) + arr[1]
  } else if (value.length === 5) {
    return value.substr(0, 1) + arr[2]
  } else if (value.length === 6) {
    return value.substr(0, 2) + arr[2]
  } else if (value.length === 7) {
    return value.substr(0, 3) + arr[2]
  } else if (value.length === 8) {
    return value.substr(0, 4) + arr[2]
  } else if (value.length === 9) {
    return value.substr(0, 1) + arr[3]
  } else if (value.length === 10) {
    return value.substr(0, 2) + arr[3]
  } else if (value.length === 11) {
    return value.substr(0, 3) + arr[3]
  } else if (value.length === 12) {
    return value.substr(0, 4) + arr[3]
  }
})

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
