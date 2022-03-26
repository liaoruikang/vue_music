import request from '@/plugin/request'
// 关注用户
export const followAPI = (id, t) => {
  return request.get('follow', { params: { id, t } })
}
