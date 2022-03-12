import { everydaySongsListAPI } from '@/api/discoverAPI'
export default {
  // 获取每日推荐歌单列表
  async getEverydaySongsList({ commit }) {
    const { data: result } = await everydaySongsListAPI()
    commit('setEverydaySongsList', result.recommend)
  }
}
