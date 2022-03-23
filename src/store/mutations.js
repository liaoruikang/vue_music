export default {
  setCFDVisible(state, val) {
    state.CFDVisible = val.display
    state.displayWho = val.component
    if (val.songId) state.songId = val.songId
    if (val.isAdd) state.isAdd = val.isAdd
    if (val.shareDetails) this.commit('forward/setShareDetails', val.shareDetails)
    if (val.tags) state.tags = val.tags
  }
}
