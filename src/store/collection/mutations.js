export default {
  // 获取用户歌单
  setUserPlayList(state, userPlayList) {
    state.userPlayList = userPlayList
  },
  setType(state, val) {
    state.type = val
  },
  // 删除用户歌单
  removeUserPlayList(state) {
    state.userPlayList = []
    state.type = null
  }
}
