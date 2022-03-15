import { songsClassAPI, songsListAPI } from '@/api/playlistAPI'
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
  }
}
