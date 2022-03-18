import { hotSingerAPI } from '@/api/discoverAPI'
import { singerListAPI } from '@/api/artistAPI'
export default {
  // 获取热门歌手数据
  async getHotSingerList({ commit }, val) {
    const { data: result } = await hotSingerAPI(val.limit, val.offset)
    commit('setHotSingerList', result)
    return result
  },
  async getSingerList({ commit }, val) {
    const { data: result } = await singerListAPI(val.limit, val.offset, val.initial, val.type, val.area)
    commit('setSingerList', result)
  }
}
