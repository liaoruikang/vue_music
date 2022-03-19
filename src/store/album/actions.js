import { discList } from '@/api/albumAPI'
export default {
  async getDiscList({ commit }, val) {
    const { data: result } = await discList(val.limit, val.offset, val.area)
    commit('setDiscList', result)
  }
}
