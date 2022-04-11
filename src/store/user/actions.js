import { userInfoAPI, userLevelAPI, vipDataAPI, recordAPI } from '@/api/userAPI'
export default {
  // 获取用户信息
  async getUserData({ commit }, id) {
    const { data: result } = await userInfoAPI(id)
    result.profile.pcSign = result.pcSign
    result.profile.mobileSign = result.mobileSign
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
  },
  // 获取用户播放记录
  async getRecord({ commit }, val) {
    const { data: result } = await recordAPI(val.uid, val.type).catch(err => err.response)
    if (result.code !== 200) return
    commit('setRecord', result)
  }
}
