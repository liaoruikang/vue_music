export default {
  setTopList(state, topList) {
    state.featureList = topList.filter((item, index) => index < 4)
    state.globalList = topList.filter((item, index) => index > 3)
  },
  // 写入歌单详情
  setSongsDetails(state, songs) {
    state.songsDetails = songs
  },
  // 清除歌单详情
  removeSongsDetails(state) {
    state.songsDetails = {}
  }
}
