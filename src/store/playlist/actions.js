import { songsClassAPI, songsListAPI, subscribersAPI, relatedAPI } from '@/api/playlistAPI'
import { songsDetailsAPI } from '@/api/songDetailsAPI'
export default {
  // 获取歌单分类列表
  async getSongClassList({ commit }) {
    const { data: result } = await songsClassAPI()
    if (result.code !== 200) return
    commit('setSongClassList', result)
  },
  // 获取歌单列表
  async getSongsList({ commit }, val) {
    const { data: result } = await songsListAPI(val.order, val.cat, val.limit, val.offset)
    if (result.code !== 200) return
    commit('setSongsList', result)
  },
  // 获取歌单详情
  async getPlaylist({ commit }, val) {
    if (val.id) {
      const { data: result } = await songsDetailsAPI(val.id, val.ist)
      if (result.code !== 200) return
      commit('setSongsDetail', result)
      return
    }
    const { data: result } = await songsDetailsAPI(val)
    if (result.code !== 200) return
    commit('setSongsDetail', result)
  },
  // 获取歌单收藏者
  async getSubscribers({ commit }, val) {
    const { data: result } = await subscribersAPI(val.id, val.limit)
    if (result.code !== 200) return
    commit('setSubscribers', result)
  },
  // 获取热门歌单
  async getRelated({ commit }, id) {
    const { data: result } = await relatedAPI(id)
    if (result.code !== 200) return
    commit('setRelated', result)
  }
}
