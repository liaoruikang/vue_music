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
  return request.get('/vip/info')
}
