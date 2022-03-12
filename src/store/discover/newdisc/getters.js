export default {
  oneNewDisc(state) {
    return state.newDiscList.slice(0, 5)
  },
  twoNewDisc(state) {
    return state.newDiscList.slice(5, 10)
  }
}
