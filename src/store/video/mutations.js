export default {
  setMvUrl(state, val) {
    state.mvUrl = val
  },
  setMvDetail(state, val) {
    val.data.brs.forEach(item => {
      if (item.br > 720 && item.br <= 1080) {
        item.name = '1080P'
      } else if (item.br > 480 && item.br <= 720) {
        item.name = '超清'
      } else if (item.br > 240 && item.br <= 480) {
        item.name = '高清'
      } else if (item.br <= 240) {
        item.name = '标清'
      }
    })
    val.data.brs = val.data.brs.reverse()
    state.mvDetail = val
  },
  setNextVideo(state, val) {
    state.nextVideo = val[0]
  },
  setRelevantVideo(state, val) {
    state.relevantVideo = val
  },
  removeMvAll(state) {
    state.mvUrl = null
    state.mvDetail = null
    state.nextVideo = null
    state.relevantVideo = null
  },
  setVideoDetail(state, val) {
    val.resolutions.forEach(item => {
      if (item.resolution > 720 && item.resolution <= 1080) {
        item.name = '1080P'
      } else if (item.resolution > 480 && item.resolution <= 720) {
        item.name = '超清'
      } else if (item.resolution > 240 && item.resolution <= 480) {
        item.name = '高清'
      } else if (item.resolution <= 240) {
        item.name = '标清'
      }
      item.br = item.resolution
      delete item.resolution
    })
    state.videoDetail = val
  },
  setVideoUrl(state, val) {
    state.videoUrl = val
  },
  removeVideoAll(state) {
    state.videoDetail = null
    state.videoUrl = null
    state.nextVideo = null
    state.relevantVideo = null
  }
}
