export default {
  setSongClassList(state, val) {
    state.songClassList = val
  },
  setSongsList(state, val) {
    state.songsList = val
  },
  setSongsDetail(state, val) {
    state.songsDetail = val
  },

  setSubscribers(state, val) {
    state.subscribers = val
  },
  setRelated(state, val) {
    state.related = val
  },
  removeAll(state) {
    state.songsDetail = null
    state.subscribers = null
    state.related = null
  }
}
