export default {
  uPlayList(state, getters, rootState, rootGetters) {
    if (state.userPlayList.length === 0) return null
    const arr = []
    state.userPlayList.playlist.forEach((item) => {
      if (item.userId === rootState.user.userId) {
        arr.push(item)
      }
    })
    return arr
  },
  cPlayList(state, getters, rootState, rootGetters) {
    if (state.userPlayList.length === 0) return null
    const arr = []
    state.userPlayList.playlist.forEach((item) => {
      if (item.userId !== rootState.user.userId) {
        arr.push(item)
      }
    })
    return arr
  }
}
