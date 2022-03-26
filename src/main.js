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
import store from '@/store'
// 导入 dayjs
import dayjs from 'dayjs'

Vue.prototype.dayjs = dayjs
Vue.prototype.$delCookie = delCookie

// 将 ElementUI 注册为全局插件
Vue.use(ElementUI)

Vue.config.productionTip = false

// 将数字单位转化为汉字单位
Vue.filter('number_ch', (value) => {
  const arr = [' 万', ' 亿']
  value = value.toString()
  if (value.length === 5) {
    return value.substr(0, 1) + arr[0]
  } else if (value.length === 6) {
    return value.substr(0, 2) + arr[0]
  } else if (value.length === 7) {
    return value.substr(0, 3) + arr[0]
  } else if (value.length === 8) {
    return value.substr(0, 4) + arr[0]
  } else if (value.length === 9) {
    return value.substr(0, 1) + arr[1]
  } else if (value.length === 10) {
    return value.substr(0, 2) + arr[1]
  } else if (value.length === 11) {
    return value.substr(0, 3) + arr[1]
  } else if (value.length === 12) {
    return value.substr(0, 4) + arr[1]
  }
  return value
})

// 获取关键字指令
Vue.directive('highlight', {
  inserted(el, binding) {
    const keywords = binding.value
    let text = el.innerText
    if (!keywords.trim()) return
    const reg = new RegExp(`(?<![<>])${keywords}(?![<>])`, 'gi')
    const arr = text.match(reg)
    if (!arr) return
    arr.forEach(item => {
      const regex = new RegExp(`(?<![<>])${item}(?![<>])`, 'g')
      text = text.replace(regex, `<b>${item}</b>`)
    })
    el.innerHTML = text
  }
})

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
