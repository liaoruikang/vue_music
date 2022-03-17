import { djCatelistAPI, recommendAPI, rankingAPI, recommendCategoryAPI, recommendDjListAPI } from '@/api/djradioAPI'
export default {
  // 获取电台分类
  async getDjCatelist({ commit }) {
    const { data: result } = await djCatelistAPI()
    if (result.code !== 200) return
    commit('setDjCatelist', result.categories)
  },
  // 获取推荐节目
  async getRecommend({ commit }, limit) {
    const { data: result } = await recommendAPI(limit)
    if (result.code !== 200) return
    commit('setRecommend', result)
  },
  // 获取节目排行榜
  async getRanking({ commit }, limit) {
    const { data: result } = await rankingAPI(limit)
    if (result.code !== 200) return
    commit('setRanking', result)
  },
  // 获取推荐分类
  async getRecommendCategory({ commit }) {
    const { data: result } = await recommendCategoryAPI()
    if (result.code !== 200) return
    commit('setRecommendCategory', result.data)
  },
  // 获取分类推荐电台列表
  async getRecommendDjList({ commit }, id) {
    const { data: result } = await recommendDjListAPI(id)
    if (result.code !== 200) return
    result.djRadios = result.djRadios.filter((item, index) => index < 5)
    commit('setRecommendDjList', result.djRadios)
  }
}
