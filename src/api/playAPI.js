import request from '@/plugin/request'
// 获取歌词
export const lyricAPI = (id) => {
  return request.get('lyric', { params: { id } })
}

// 获取歌曲Url
export const songUrlAPI = (id, br) => {
  if (br === undefined) br = 999000
  return request.get('song/url', { params: { id, br } })
}
