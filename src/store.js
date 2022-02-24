import Vue from 'vue'
import Vuex from 'vuex'
import {
  reSongListAPI,
  everydaySongListAPI,
  everydaySongsAPI,
  newDiscAPI,
  topListAPI,
  songDetailsAPI,
  userInfoAPI,
  userLevelAPI, hotSingerAPI
} from '@/api/discoverAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
    userId: null,
    // 推荐歌单列表
    reSongList: [],
    // 每日推荐歌单列表
    everyDayList: [],
    // 每日推荐歌曲列表
    everydaySongs: [],
    // 新碟上架列表
    newDiscList: [],
    // 榜单列表
    topList: [],
    // 前三榜单的榜单详情
    topThreeListdetail: [],
    // 用户信息
    userData: {},
    // 用户等级信息
    userLevel: null,
    // 热门歌手列表
    hotSingerList: []
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
      console.log(newDiscList)
    },
    setTopList(state, topList) {
      state.topList = topList
    },
    setTopThreeListdetail(state, Listdetail) {
      state.topThreeListdetail.push(Listdetail)
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    setUserData(state, userData) {
      state.userData = userData
    },
    setUserLevel(state, userLevel) {
      state.userLevel = userLevel
    },
    setHotSingerList(state, hotSingerList) {
      state.hotSingerList = hotSingerList
      console.log(hotSingerList)
    },
    removeTopThreeListdetail(state) {
      state.topThreeListdetail = []
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
    },
    // 获取榜单列表
    async getTopList({ commit, dispatch }) {
      const { data: result } = await topListAPI()
      commit('setTopList', result.list)
      // 调用获取歌单详情API
      const three = result.list.filter((item, index) => index < 3)
      three.forEach(item => dispatch('getSongsdetails', item.id))
    },
    // 获取歌单详情
    async getSongsdetails({ commit }, id) {
      const { data: result } = await songDetailsAPI(id)
      result.playlist.tracks = result.playlist.tracks.slice(0, 10)
      commit('setTopThreeListdetail', result.playlist)
    },
    // 获取用户信息
    async getUserData({ commit }, id) {
      const { data: result } = await userInfoAPI(id)
      commit('setUserData', result.profile)
    },
    // 获取用户等级信息
    async getUserLevel({ commit }) {
      const { data: result } = await userLevelAPI()
      commit('setUserLevel', result.data.level)
    },
    // 获取热门歌手列表
    async getHotSingerList({ commit }, limit, offset) {
      const { data: result } = await hotSingerAPI(limit, offset)
      commit('setHotSingerList', result.artists)
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
