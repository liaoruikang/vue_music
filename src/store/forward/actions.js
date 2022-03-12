import { followsAPI, shareAPI, privateSongAPI, privateSongsAPI } from '@/api/forwardAPI'
export default {
  // 获取用户好友列表
  async getFollows({ commit }, uid) {
    const { data: result } = await followsAPI(uid)
    if (result.code !== 200) return
    commit('setFollows', result.follow)
  },
  // 分享文本、歌曲、歌单、mv、电台、电台节目到动态接口
  async shareSong({ commit }, shareForm) {
    return await shareAPI(shareForm)
  },
  // 私信分享（好友）
  async privateSong({ commit }, privateForm) {
    return await privateSongAPI(privateForm)
  },
  // 私信分享（歌单）
  async privateSongs({ commit }, privateForm) {
    return await privateSongsAPI(privateForm)
  }
}
