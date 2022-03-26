export default {
  // 写入收藏歌手
  setMySinger(state, val) {
    state.mySinger = val
  },
  removeMySinger(state) {
    state.mySinger = null
  }
}
