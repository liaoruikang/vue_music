import request from '@/plugin/request'
//  传入资源类型和资源 id,以及排序方式,可获取对应资源的评论
// id: 资源 id, 如歌曲 id, mv id
// type: 数字, 资源类型, 对应歌曲, mv, 专辑, 歌单, 电台, 视频对应以下类型
// 0: 歌曲// 1: mv// 2: 歌单// 3: 专辑// 4: 电台// 5: 视频// 6: 动态
// 可选参数 :
// pageNo:分页参数,第 N 页,默认为 1
// pageSize:分页参数,每页多少条数据,默认 20
// sortType: 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
// cursor: 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
export const commentAPI = (id, type, pageNo, pageSize, sortType, cursor) => {
  const timestamp = new Date().getTime()
  if (id && type && pageNo && pageSize && sortType && cursor) {
    return request.get('comment/new', { params: { id, type, pageNo, pageSize, sortType, cursor, timestamp } })
  } else if (id && type && pageNo && pageSize && sortType) {
    return request.get('comment/new', { params: { id, type, pageNo, pageSize, sortType, timestamp } })
  } else if (id && type && pageNo && pageSize) {
    return request.get('comment/new', { params: { id, type, pageNo, pageSize, timestamp } })
  } else if (id && type && pageNo) {
    return request.get('comment/new', { params: { id, type, pageNo, timestamp } })
  } else if (id && type) {
    return request.get('comment/new', { params: { id, type, timestamp } })
  } else {
    return new Promise((resolve, reject) => {
      reject(new Error({ message: '请传递参数' }))
    }).catch(err => err.message)
  }
}
