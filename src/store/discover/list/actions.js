import { topListAPI } from '@/api/discoverAPI'
import { songsDetailsAPI } from '@/api/songDetailsAPI'
export default {
  // 获取榜单列表
  async getTopList({ commit, dispatch }) {
    const { data: result } = await topListAPI()
    commit('setTopList', result.list)
    // 调用获取歌单详情API
    const three = result.list.filter((item, index) => index < 3)
    three.forEach(item => dispatch('getSongsdetails', item.id))
  },
  // 获取歌单详情
  async getSongsdetails({ commit }, id) {
    const { data: result } = await songsDetailsAPI(id)
    result.playlist.tracks = result.playlist.tracks.slice(0, 10)
    commit('setTopThreeListdetail', result.playlist)
  }
}
