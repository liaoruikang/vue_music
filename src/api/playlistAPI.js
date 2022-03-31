import request from '@/plugin/request'

// 获取歌单分类列表
export const songsClassAPI = () => {
  return request('playlist/catlist')
}

// 获取歌单
export const songsListAPI = (order, cat, limit, offset) => {
  return request.get('top/playlist', { params: { order, cat, limit, offset } })
}

// 获取歌单收藏者
export const subscribersAPI = (id, limit, offset) => {
  return request('playlist/subscribers', { params: { id, limit, offset } })
}

// 歌单热门歌单
export const relatedAPI = (id) => {
  return request('related/playlist', { params: { id } })
}
