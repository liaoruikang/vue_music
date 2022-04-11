import { tasteAPI } from '@/api/discoverAPI'
export default {
  async getTasteDetail({ commit }) {
    const { data: result } = await tasteAPI()
    if (result.code !== 200) return
    commit('setTasteDetail', result.data)
  }
}
