// 导入歌单API
import { userPlayListAPI, playlistTarcksAPI, createPlaylistAPI } from '@/api/collectionAPI'
export default {
  // 获取用户歌单
  async getUserPlayList({ commit }, uid) {
    const { data: result } = await userPlayListAPI(uid)
    if (result.code !== 200) return
    commit('setUserPlayList', result)
  },
  // 添加或删除歌单歌曲
  async playlistTarcks({ commit }, val) {
    return await playlistTarcksAPI(val.op, val.pid, val.tarcks).catch(err => {
      return err.response
    })
  },
  // 新建歌单
  async createPlaylist({ commit }, val) {
    return await createPlaylistAPI(val.name)
  }
}
