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
