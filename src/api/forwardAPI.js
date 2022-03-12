import request from '@/plugin/request'

export const followsAPI = (uid, limit, offset) => {
  if (uid && limit && offset) {
    return request.get('user/follows?', { params: { uid, limit, offset } })
  } else if (uid && limit) {
    return request.get('user/follows?', { params: { uid, limit } })
  } else if (uid) {
    return request.get('user/follows?', { params: { uid } })
  } else {
    return Promise.reject(new Error('请传递参数'))
  }
}

// 分享文本、歌曲、歌单、mv、电台、电台节目到动态接口
export const shareAPI = (shareForm) => {
  return request.get('share/resource', { params: shareForm })
}

// 发送私信（歌曲）
export const privateSongAPI = (privateForm) => {
  return request.get('send/song', { params: { user_ids: privateForm.user_id, id: privateForm.id, msg: privateForm.msg } })
}

// 私信分享（歌单）
export const privateSongsAPI = (privateForm) => {
  return request.get('send/playlist', { params: { user_ids: privateForm.user_id, playlist: privateForm.id, msg: privateForm.msg } })
}
