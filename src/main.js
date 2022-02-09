import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入 ElementUI 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局 less 样式
import '@/assets/css/global.less'

// 将 ElementUI 注册为全局插件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
