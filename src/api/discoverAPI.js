import request from '@/plugin/request'

// 获取轮播图列表
export const bannerListAPI = () => {
  return request.get('banner')
}

// 获取热门歌单分类
export const hotPlaylistAPI = () => {
  return request.get('playlist/hot')
}

// 获取推荐歌单
export const reSongListAPI = (limit) => {
  return request.get('personalized', { params: { limit } })
}

// 获取每日推荐歌单
export const everydaySongListAPI = () => {
  return request.get('recommend/resource')
}

// 获取每日歌曲推荐
export const everydaySongsAPI = () => {
  return request.get('recommend/songs')
}

// 获取新碟上架
export const newDiscAPI = () => {
  return request.get('album/newest')
}

// 获取所有榜单
export const topListAPI = () => {
  return request.get('toplist')
}

// 获取歌单详情
export const songDetailsAPI = (id) => {
  return request.get('playlist/detail', { params: { id } })
}

// 获取用户信息
export const userInfoAPI = (uid) => {
  return request.get('user/detail', { params: { uid } })
}

// 获取用户等级信息
export const userLevelAPI = () => {
  return request.get('user/level')
}

// 签到
export const signInAPI = () => {
  return request.get('daily_signin', { params: { type: 1 } })
}

// 获取热门歌手
export const hotSingerAPI = (limit, offset) => {
  if (limit === undefined) { limit = 50 }
  if (offset === undefined) { offset = 0 }
  return request.get('/top/artists', { params: { limit, offset } })
}
