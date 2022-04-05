import request from '@/plugin/request'
// 获取歌单详情
export const songsDetailsAPI = (id, ist) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('playlist/detail', { params: { id, timestamp: ist ? timestamp : null } })
}
// 获取歌曲详情
export const songDetailsAPI = (ids) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('song/detail', { params: { ids, timestamp } })
}
// 获取专辑详情
export const albumDetailsAPI = (id) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('album', { params: { id, timestamp } })
}
// 获取节目详情
export const radioDetailsAPI = (id) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('dj/program/detail', { params: { id, timestamp } })
}
// 获取相似音乐
export const simiSongAPI = (id) => {
  return request.get('simi/song', { params: { id } })
}
