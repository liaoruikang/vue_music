import { djCatelistAPI, recommendAPI, rankingAPI, recommendCategoryAPI, recommendDjListAPI, djDetailAPI, programDetailAPI } from '@/api/djradioAPI'
import { songDetailsAPI, radioDetailsAPI } from '@/api/songDetailsAPI'
export default {
  // 获取电台分类
  async getDjCatelist({ commit }) {
    const { data: result } = await djCatelistAPI()
    if (result.code !== 200) return
    commit('setDjCatelist', result.categories)
  },
  // 获取推荐节目
  async getRecommend({ commit }, limit) {
    const { data: result } = await recommendAPI(limit)
    if (result.code !== 200) return
    commit('setRecommend', result)
  },
  // 获取节目排行榜
  async getRanking({ commit }, limit) {
    const { data: result } = await rankingAPI(limit)
    if (result.code !== 200) return
    commit('setRanking', result)
  },
  // 获取推荐分类
  async getRecommendCategory({ commit }) {
    const { data: result } = await recommendCategoryAPI()
    if (result.code !== 200) return
    commit('setRecommendCategory', result.data)
  },
  // 获取分类推荐电台列表
  async getRecommendDjList({ commit }, id) {
    const { data: result } = await recommendDjListAPI(id)
    if (result.code !== 200) return
    result.djRadios = result.djRadios.filter((item, index) => index < 5)
    commit('setRecommendDjList', result.djRadios)
  },
  // 获取电台详情
  async getDjDetail({ commit }, rid) {
    const { data: result } = await djDetailAPI(rid)
    if (result.code !== 200) return
    commit('setDjDetail', result)
  },
  // 获取节目列表
  async playAll({ commit }, val) {
    const { data: result } = await programDetailAPI(val.rid, val.limit, val.offset, val.asc)
    if (result.code !== 200) return
    let arr = []
    result.programs.forEach(item => arr.push(item.mainTrackId))
    arr = arr.join(',')
    const { data: res } = await songDetailsAPI(arr)
    res.songs.forEach((item, index) => {
      item.name = result.programs[index].mainSong.name
      item.al.picUrl = result.programs[index].radio.picUrl
      item.ar[0].name = result.programs[index].radio.name
      item.ar[0].id = result.programs[index].radio.id
    }
    )

    this.commit('play/setSongList', res.songs)
    this.commit('play/setCurrentPlay', res.songs[0])
  },
  async getProgramList({ commit }, val) {
    const { data: result } = await programDetailAPI(val.rid, val.limit, val.offset, val.asc)
    if (result.code !== 200) return
    commit('setProgramList', result)
  },
  async getProgramDetail({ commit }, id) {
    const { data: result } = await radioDetailsAPI(id)
    if (result.code !== 200) return
    commit('setProgramDetail', result.program)
  }
}
