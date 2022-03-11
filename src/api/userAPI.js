import request from '@/plugin/request'
// 获取用户信息
export const userInfoAPI = (uid) => {
  return request.get('user/detail', { params: { uid } })
}

// 获取用户等级信息
export const userLevelAPI = () => {
  return request.get('user/level')
}
// 获取vip信息
export const vipDataAPI = () => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('/vip/info', { params: { timestamp } })
}
