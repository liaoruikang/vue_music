import request from '@/plugin/request'

// 获取排行榜分类
export const toplistAPI = () => {
  return request.get('toplist')
}
