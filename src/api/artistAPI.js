import request from '@/plugin/request'

// 获取歌手列表
export const singerListAPI = (limit, offset, initial, type, area) => {
  return request.get('artist/list', { params: { limit, offset, initial, type, area } })
}

// 获取歌手详情
export const singerDetailAPI = (id) => {
  const timestamp = new Date().getTime()
  return request.get('artists', { params: { id, timestamp } })
}

// 收藏/取消 歌手
export const artistSubAPI = (id, t) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('artist/sub', { params: { id, t, timestamp } })
}

// 获取歌手专辑
export const artistAlbumAPI = (id, limit, offset) => {
  return request.get('artist/album', { params: { id, limit, offset } })
}

// 获取歌手MV
export const artistMvAPI = (id, limit, offset) => {
  return request.get('artist/mv', { params: { id, limit, offset } })
}
// 获取歌手描述
export const artistDescAPI = (id) => {
  return request.get('artist/desc', { params: { id } })
}

// 获取相似歌手
export const simiArtistAPI = (id) => {
  return request.get('simi/artist', { params: { id } })
}
