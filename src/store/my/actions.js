import { deletePlayListAPI, mySingerAPI, updatePlayListAPI } from '@/api/myAPI'
export default {
  // 删除用户歌单
  deletePlayList({ commit }, id) {
    return deletePlayListAPI(id)
  },
  // 获取收藏歌手
  async getMySinger({ commit }) {
    const { data: result } = await mySingerAPI()
    commit('setMySinger', result)
  },
  // 更新用户歌单
  updatePlayList({ commit }, val) {
    return updatePlayListAPI(val.id, val.name, val.desc, val.tags)
  }
}
