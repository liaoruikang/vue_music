import { toplistAPI } from '@/api/toplistAPI'
import { songsDetailsAPI } from '@/api/songDetailsAPI'
export default {
  async getToplist({ commit }) {
    const { data: result } = await toplistAPI()
    if (result.code !== 200) return
    commit('setTopList', result.list)
  },
  // 获取歌单详情
  async getSongsDetails({ commit }, id) {
    if (id.ist) {
      const { data: result } = await songsDetailsAPI(id.id, id.ist)
      if (result.code !== 200) return
      commit('setSongsDetails', result.playlist)
    }
    const { data: result } = await songsDetailsAPI(id)
    if (result.code !== 200) return
    commit('setSongsDetails', result.playlist)
  }
}
