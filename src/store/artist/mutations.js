export default {
  setHotSingerList(state, val) {
    if (state.hotSingerList === null) {
      state.hotSingerList = val
      return
    }
    state.hotSingerList.more = val.more
    state.hotSingerList.artists.push(...val.artists)
  },
  reomveHotSingerList(state) {
    state.hotSingerList = null
  },
  // 写入歌手列表数据
  setSingerList(state, val) {
    if (!val) {
      state.GlobalSingerList = val
      return
    }
    state.GlobalSingerList = val.artists
  }
}
