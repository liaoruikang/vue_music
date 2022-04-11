import { mvUrlAPI, mvDetailAPI, mvDetailInfoAPI, relevantVideoAPI, videoDetailAPI, videoUrlAPI, videoDetailInfoAPI } from '@/api/videoAPI'
export default {
  // 获取mvurl
  async getMvUrl({ commit }, val) {
    const { data: result } = await mvUrlAPI(val.id, val.r)
    if (!result) return
    if (result.code !== 200) return
    commit('setMvUrl', result.data)
  },
  async getMvDetail({ commit }, id) {
    const { data: result } = await mvDetailAPI(id)
    const { data: res } = await mvDetailInfoAPI(id)
    if (result.code !== 200 || res.code !== 200) return
    result.data.liked = res.liked
    result.data.likedCount = res.likedCount
    commit('setMvDetail', result)
  },
  async getNextVideo({ commit }, id) {
    const { data: result } = await relevantVideoAPI(id)
    if (result.code !== 200) return
    commit('setNextVideo', result.data)
  },
  async getRelevantVideo({ commit }, id) {
    const { data: result } = await relevantVideoAPI(id)
    if (result.code !== 200) return
    commit('setRelevantVideo', result.data)
  },
  async getVideoDetail({ commit }, id) {
    const { data: result } = await videoDetailAPI(id)
    const { data: res } = await videoDetailInfoAPI(id)
    if (result.code !== 200 || res.code !== 200) return
    delete res.code
    const data = Object.assign(result.data, res)
    commit('setVideoDetail', data)
  },
  async getVideoUrl({ commit }, val) {
    const { data: result } = await videoUrlAPI(val.id, val.r)
    if (result.code !== 200) return
    commit('setVideoUrl', result)
  }
}
