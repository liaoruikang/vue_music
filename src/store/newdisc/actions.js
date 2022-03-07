import { newDiscAPI } from '@/api/discoverAPI'
export default {
  // 获取新碟上架列表
  async getNewDiscList({ commit }) {
    const { data: result } = await newDiscAPI()
    result.albums.forEach(item => {
      if (item.name.length > 15) {
        item.name = item.name.substr(0, 15) + '...'
      }
    })
    commit('setNewDiscList', result.albums)
  }
}
