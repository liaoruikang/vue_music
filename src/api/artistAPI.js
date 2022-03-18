import request from '@/plugin/request'

// 获取歌手列表
export const singerListAPI = (limit, offset, initial, type, area) => {
  return request.get('artist/list', { params: { limit, offset, initial, type, area } })
}
