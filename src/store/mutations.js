export default {
  setCFDVisible(state, val) {
    state.CFDVisible = val.display
    state.displayWho = val.component
    if (val.songId) state.songId = val.songId
    if (val.shareDetails) this.commit('forward/setShareDetails', val.shareDetails)
  }
}
