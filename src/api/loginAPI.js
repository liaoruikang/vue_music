import request from '@/plugin/request'
// 获取国家编码API
export const getCodeListAPI = () => {
  return request.get('countries/code/list')
}
// 获取手机验证码
export const getCodeAPI = (phone, ctcode) => {
  return request.post('captcha/sent', { phone, ctcode })
}
// 手机登录 接收一个参数对象
export const phoneLoginAPI = (loginFrom) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.post('login/cellphone?' + timestamp, loginFrom)
}
// 邮箱登录 接收一个参数对象
export const emailLoginAPI = (emailForm) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.post('login?' + timestamp, emailForm)
}
