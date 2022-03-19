export default {
  setTopThreeListdetail(state, Listdetail) {
    if (state.topThreeListdetail.length >= 3) return
    state.topThreeListdetail.push(Listdetail)
  },
  removeTopThreeListdetail(state) {
    state.topThreeListdetail = []
  },
  setTopList(state, topList) {
    state.topList = topList
  }
}
