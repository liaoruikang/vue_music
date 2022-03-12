export default {
  setTopThreeListdetail(state, Listdetail) {
    state.topThreeListdetail.push(Listdetail)
  },
  removeTopThreeListdetail(state) {
    state.topThreeListdetail = []
  },
  setTopList(state, topList) {
    state.topList = topList
  }
}
