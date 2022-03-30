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
  },
  // 写入歌手详情
  setSingerDetail(state, val) {
    state.singerDetail = val
  },
  // 删除歌手详情
  removeSingerDetail(state) {
    state.singerDetail = null
  },
  // 写入歌手专辑
  setArtistAlbum(state, val) {
    state.artistAlbum = val
  },
  // 写入歌手MV
  setArtistMv(state, val) {
    state.artistMv = val
  },
  // 写入歌手描述
  setArtisDesc(state, val) {
    state.artistDesc = val
  },
  removeAll(state) {
    state.artistDesc = null
    state.artistMv = null
    state.artistAlbum = null
    state.singerDetail = null
    state.simiArtist = null
  },
  setSimiArtist(state, val) {
    state.simiArtist = val
  }

}
