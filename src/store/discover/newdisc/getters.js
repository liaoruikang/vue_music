export default {
  oneNewDisc(state) {
    if (!state.newDiscList) return null
    return state.newDiscList.slice(0, 5)
  },
  twoNewDisc(state) {
    if (!state.newDiscList) return null
    return state.newDiscList.slice(5, 10)
  }
}
