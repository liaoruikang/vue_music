import { userInfoAPI, userLevelAPI, vipDataAPI } from '@/api/userAPI'
export default {
  // 获取用户信息
  async getUserData({ commit }, id) {
    const { data: result } = await userInfoAPI(id)
    commit('setUserData', result.profile)
  },
  // 获取用户等级信息
  async getUserLevel({ commit }) {
    const { data: result } = await userLevelAPI()
    commit('setUserLevel', result.data.level)
  },
  // 获取vip信息
  async getVipData({ commit }) {
    const { data: result } = await vipDataAPI()
    commit('setVipData', result.data)
  }
}
