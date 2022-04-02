import { discList } from '@/api/albumAPI'
import { albumDetailsAPI } from '@/api/songDetailsAPI'
export default {
  async getDiscList({ commit }, val) {
    const { data: result } = await discList(val.limit, val.offset, val.area)
    commit('setDiscList', result)
  },
  // 获取专辑详情
  async getAlbumDetail({ commit }, id) {
    const { data: result } = await albumDetailsAPI(id)
    if (result.code !== 200) return
    commit('setAlbumDetail', result)
  }
}
