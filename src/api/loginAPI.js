import request from '@/plugin/request'

// 获取国家编码API
export const getCodeListAPI = () => {
  return request.get('countries/code/list')
}
// 获取手机验证码
export const getCodeAPI = (phone, ctcode) => {
  return request.post('captcha/sent', { phone, ctcode })
}
// 登录 接收一个参数对象
export const loginAPI = (loginFrom) => {
  return request.post('login/cellphone', loginFrom)
}
