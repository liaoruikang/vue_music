import { hotSingerAPI } from '@/api/discoverAPI'
export default {
  // 获取热门歌手列表
  async getHotSingerList({ commit }, limit, offset) {
    const { data: result } = await hotSingerAPI(limit, offset)
    commit('setHotSingerList', result.artists)
  }
}
