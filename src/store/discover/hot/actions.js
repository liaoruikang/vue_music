import { reSongsListAPI } from '@/api/discoverAPI'
export default {
  // 获取推荐歌单列表
  async getSongsList({ commit }, limit) {
    const { data } = await reSongsListAPI(limit)
    commit('setreSongsList', data.result)
  }
}
