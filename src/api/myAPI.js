import request from '@/plugin/request'

// 获取收藏歌手
export const mySingerAPI = () => {
  return request.get('artist/sublist')
}

// 删除歌单
export const deletePlayListAPI = (id) => {
  return request.get('playlist/delete', { params: { id } })
}

// 更新歌单
// id:歌单id
// name:歌单名字
// desc:歌单描述
// tags:歌单tag ,多个用 `;` 隔开,只能用官方规定标签
export const updatePlayListAPI = (id, name, desc, tags) => {
  return request.get('playlist/update', { params: { id, name, desc, tags } })
}

// 更新歌单封面
export const updateCoverAPI = (id, imgSize, imgX, imgY, formData) => {
  // 添加一个时间戳URL参数 防止API缓存
  const timestamp = new Date().getTime()
  return request({
    method: 'post',
    url: `playlist/cover/update?id=${id}&imgSize=${imgSize}&imgX=${imgX}&imgY=${imgY}&timestamp=${timestamp}`,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}
