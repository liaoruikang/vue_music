import request from '@/plugin/request'

// 获取轮播图列表

export const bannerListAPI = () => {
  return request.get('/banner')
}
