import request from '@/plugin/request'

// 获取搜索建议
export const proposalAPI = (keywords, type) => {
  return request.get('search/suggest', { params: { keywords, type } })
}

// 搜索
export const searchAPI = (keywords, type, limit, offset) => {
  const timestamp = new Date().getTime()
  return request.get('cloudsearch', { params: { keywords, type, limit, offset, timestamp } })
}
