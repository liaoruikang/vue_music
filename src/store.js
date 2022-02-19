import Vue from 'vue'
import Vuex from 'vuex'
import { reSongListAPI } from '@/api/discoverAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 推荐歌单列表
    reSongList: []
  },
  mutations: {
    setreSongList(state, songList) {
      state.reSongList = songList
      console.log(state.reSongList)
    }
  },
  actions: {
    // 获取歌单列表
    async getSongList({ commit }, limit) {
      const { data } = await reSongListAPI(limit)
      commit('setreSongList', data.result)
    }

  },
  getters: {}
})
