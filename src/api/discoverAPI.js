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
