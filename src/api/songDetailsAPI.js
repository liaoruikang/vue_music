import request from '@/plugin/request'
// 获取歌单详情
export const songsDetailsAPI = (id) => {
  return request.get('playlist/detail', { params: { id } })
}
// 获取歌曲详情
export const songDetailsAPI = (ids) => {
  return request.get('song/detail', { params: { ids } })
}
// 获取专辑详情
export const albumDetailsAPI = (id) => {
  return request.get('album', { params: { id } })
}
