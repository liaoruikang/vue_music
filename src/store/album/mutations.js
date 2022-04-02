export default {
  setDiscList(state, val) {
    state.discList = val
  },
  setAlbumDetail(state, val) {
    val.album.description = val.album.description.split(/\n/g)
    val.album.description.forEach((item, index) => {
      if (item.trim().length === 0) {
        val.album.description.splice(index, 1)
      }
    })
    val.songsId = ''
    val.songs.forEach(item => {
      val.songsId += item.id + ','
    })
    val.songsId = val.songsId.substr(0, val.songsId.length - 1)
    state.albumDetail = val
  },
  removeAll(state) {
    state.albumDetail = null
  }
}
