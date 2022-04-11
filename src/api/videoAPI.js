import request from '@/plugin/request'

// 获取mvURL
export const mvUrlAPI = (id, r) => {
  const timestamp = new Date().getTime()
  return request.get('mv/url', { params: { id, r, timestamp } }).catch(err => err)
}

// 获取mv详情
export const mvDetailAPI = (mvid) => {
  const timestamp = new Date().getTime()
  return request.get('mv/detail', { params: { mvid, timestamp } })
}

// 获取 mv 点赞转发评论数数据
export const mvDetailInfoAPI = (mvid) => {
  const timestamp = new Date().getTime()
  return request.get('mv/detail/info', { params: { mvid, timestamp } })
}

// 收藏/取消收藏 MV
export const mvSubAPI = (mvid, t) => {
  const timestamp = new Date().getTime()
  return request.get('mv/sub', { params: { mvid, t, timestamp } })
}

// 获取视频URL
export const videoUrlAPI = (id, r) => {
  const timestamp = new Date().getTime()
  return request.get('video/url', { params: { id, r, timestamp } }).catch(err => err)
}

// 获取相关视频
export const relevantVideoAPI = (id) => {
  const timestamp = new Date().getTime()
  return request.get('related/allvideo', { params: { id, timestamp } }).catch(err => err)
}

// 收藏/取消收藏 视频
export const videoSubAPI = (id, t) => {
  const timestamp = new Date().getTime()
  return request.get('video/sub', { params: { id, t, timestamp } })
}
// 获取视频详情
export const videoDetailAPI = (id) => {
  const timestamp = new Date().getTime()
  return request.get('video/detail', { params: { id, timestamp } })
}
// 获取 视频 点赞转发评论数数据
export const videoDetailInfoAPI = (vid) => {
  const timestamp = new Date().getTime()
  return request.get('video/detail/info', { params: { vid, timestamp } })
}
