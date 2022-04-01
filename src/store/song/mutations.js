export default {
  setSongDetail(state, val) {
    state.songDetail = val
  },
  setLyric(state, val) {
    val.lrc.lyric = val.lrc.lyric.replace(/\[[\S]+\]/g, '').split(/\n/g)
    state.lyric = val.lrc.lyric
  },
  setSimiSong(state, val) {
    state.simiSong = val
  },
  setSimiPlaylist(state, val) {
    state.simiPlaylist = val
  },
  removeAll(state) {
    state.songDetail = null
    state.lyric = null
    state.simiSong = null
    state.simiPlaylist = null
  }
}
