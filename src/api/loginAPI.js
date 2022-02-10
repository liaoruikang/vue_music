import request from '@/plugin/request'
// 获取国家编码API
export const getCodeListAPI = () => {
  return request.get('countries/code/list')
}
// 获取手机验证码
export const getCodeAPI = (phone, ctcode) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.post('captcha/sent?timestamp=' + timestamp, { phone, ctcode })
}
// 手机登录 接收一个参数对象
export const phoneLoginAPI = (loginFrom) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.post('login/cellphone?timestamp=' + timestamp, loginFrom)
}
// 邮箱登录 接收一个参数对象
export const emailLoginAPI = (emailForm) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.post('login?timestamp=' + timestamp, emailForm)
}
// 登录状态检测
export const loginStateAPI = () => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('login/status?timestamp=' + timestamp)
}

// 二维码 key 生成接口
export const qrKeyAPI = () => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('login/qr/key?timestamp=' + timestamp)
}

//  二维码生成接口
export const qrCodeAPI = (key) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get(`login/qr/create`, {
    params: {
      timestamp,
      key,
      qrimg: true
    }
  })
}

// 二维码检测扫码状态接口
export const qrStateAPI = (key) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get(`login/qr/check`, {
    params: {
      timestamp,
      key
    }
  })
}
