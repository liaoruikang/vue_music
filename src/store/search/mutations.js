export default {
  setHeadProposalList(state, val) {
    state.headProposalList = val
  },
  removeHeadProposalList(state) {
    state.headProposalList = null
  },
  setSearchProposalList(state, val) {
    state.searchProposalList = val
  },
  removeSearchProposalList(state) {
    state.searchProposalList = null
  },
  // 写入搜索结果
  setSearch(state, val) {
    state.searchList = val
  },
  removeSearch(state) {
    state.searchList = null
  }
}
