import request from '@/plugin/request'

// 获取用户歌单
export const userPlayListAPI = (uid) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('user/playlist', { params: { uid, timestamp } })
}

// 添加或删除歌单歌曲
export const playlistTarcksAPI = (op, pid, tracks) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('/playlist/tracks', { params: { op, pid, tracks, timestamp } })
}

// 建新歌单
export const createPlaylistAPI = (name, privacy, type) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  if (name && privacy && type) {
    return request.get('playlist/create', { params: { name, privacy, type, timestamp } })
  } else if (name && privacy) {
    return request.get('playlist/create', { params: { name, privacy, timestamp } })
  } else if (name && type) {
    return request.get('playlist/create', { params: { name, type, timestamp } })
  } else if (name) {
    return request.get('playlist/create', { params: { name, timestamp } })
  } else {
    return new Promise((resolve, reject) => {
      reject(new Error({ message: '请传递参数' }))
    }).catch(err => err.message)
  }
}

// 收藏/取消收藏歌单
export const shoucangPlaylistAPI = (t, id) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request.get('playlist/subscribe', { params: { t, id, timestamp } })
}
