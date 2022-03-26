import { proposalAPI, searchAPI } from '@/api/searchAPI'
export default {
  // 获取搜索建议
  async getHeadProposalList({ commit }, val) {
    const { data: result } = await proposalAPI(val.keywords, val.type).catch(err => err.response)
    if (result.code !== 200) return
    commit('setHeadProposalList', result.result)
  },
  async getSearchProposalList({ commit }, val) {
    const { data: result } = await proposalAPI(val.keywords, val.type).catch(err => err.response)
    if (result.code !== 200) return
    commit('setSearchProposalList', result.result)
  },
  // 获取搜索结果
  async getSearch({ commit }, val) {
    const { data: result } = await searchAPI(val.keywords, val.type, val.limit, val.offset)
    if (result.code !== 200) return
    commit('setSearch', result)
  }
}
