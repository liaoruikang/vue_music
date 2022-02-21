import Vue from 'vue'
import Vuex from 'vuex'
import { reSongListAPI, everydaySongListAPI, everydaySongsAPI, newDiscAPI } from '@/api/discoverAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
    // 推荐歌单列表
    reSongList: [],
    // 每日推荐歌单列表
    everyDayList: [],
    // 每日推荐歌曲列表
    everydaySongs: [],
    // 新碟上架列表
    newDiscList: []
  },
  mutations: {
    setreSongList(state, songList) {
      state.reSongList = songList
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin
    },
    setEverydaySongList(state, everyDaySongList) {
      state.everyDayList = everyDaySongList
    },
    setSongs(state, songs) {
      state.everydaySongs = songs
    },
    setNewDiscList(state, newDiscList) {
      state.newDiscList = newDiscList
    }
  },
  actions: {
    // 获取歌单列表
    async getSongList({ commit }, limit) {
      const { data } = await reSongListAPI(limit)
      commit('setreSongList', data.result)
    },
    // 获取每日推荐歌单列表
    async getEverydaySongList({ commit }) {
      const { data: result } = await everydaySongListAPI()
      commit('setEverydaySongList', result.recommend)
    },
    // 获取每日推荐歌曲
    async getSongs({ commit }) {
      const { data: result } = await everydaySongsAPI()
      commit('setSongs', result.data.dailySongs)
    },
    // 获取新碟上架列表
    async getNewDiscList({ commit }) {
      const { data: result } = await newDiscAPI()
      result.albums.forEach(item => {
        if (item.name.length > 15) {
          item.name = item.name.substr(0, 15) + '...'
        }
      })
      commit('setNewDiscList', result.albums)
    }
  },
  getters: {
    daySongList(state) {
      const index = []
      for (let i = 0; i < 100; i++) {
        const random = Math.floor(Math.random() * 5)
        if (index.every(item => item !== random)) {
          index.push(random)
        }
        if (index.length === 3) {
          break
        }
      }
      const newSongList = []
      index.forEach(item => {
        newSongList.push(state.everyDayList[item])
      })
      if (newSongList[0] === undefined) return false
      return newSongList
    },
    oneNewDisc(state) {
      return state.newDiscList.slice(0, 5)
    },
    twoNewDisc(state) {
      return state.newDiscList.slice(5, 10)
    }
  }
})
