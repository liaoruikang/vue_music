import request from '@/plugin/request'

// 获取电台分类
export const djCatelistAPI = () => {
  return request.get('dj/catelist')
}

// 获取推荐节目
export const recommendAPI = (limit) => {
  return request.get('program/recommend', { params: { limit } })
}

// 获取节目排行榜
export const rankingAPI = (limit) => {
  return request.get('/dj/program/toplist', { params: { limit } })
}

// 获取推荐分类
export const recommendCategoryAPI = () => {
  return request.get('dj/category/recommend')
}

// 分类推荐电台列表
export const recommendDjListAPI = (type) => {
  return request.get('dj/recommend/type', { params: { type } })
}

// 类别热门电台
export const radioHotAPI = (cateId, limit, offset) => {
  return request.get('dj/radio/hot', { params: { cateId, limit, offset } })
}

// 获取电台详情
export const djDetailAPI = (rid) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('dj/detail', { params: { rid, timestamp } })
}

// 获取节目列表
export const programDetailAPI = (rid, limit, offset, asc) => {
  return request.get('dj/program', { params: { rid, limit, offset, asc } })
}

// 订阅电台
export const subDjAPI = (rid, t) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('dj/sub', { params: { rid, t, timestamp } })
}

// 点赞
export const resourcesLikeAPI = (id, t, type) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  // 1: mv

  // 4: 电台

  // 5: 视频

  // 6: 动态
  return request.get('resource/like', { params: { id, t, type, timestamp } })
}
