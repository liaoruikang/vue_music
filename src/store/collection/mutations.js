export default {
  // 获取用户歌单
  setUserPlayList(state, userPlayList) {
    state.userPlayList = userPlayList
  },
  // 删除用户歌单
  removeUserPlayList(state) {
    state.userPlayList = []
  }
}
