import Vue from 'vue'
import Vuex from 'vuex'
import {
  reSongsListAPI,
  everydaySongsListAPI,
  everydaySongsAPI,
  newDiscAPI,
  topListAPI,
  songsDetailsAPI,
  userInfoAPI,
  userLevelAPI,
  hotSingerAPI,
  songDetailsAPI,
  albumDetailsAPI,
  lyricAPI, songUrlAPI
} from '@/api/discoverAPI'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否登录
    isLogin: false,
    userId: null,
    // 推荐歌单列表
    reSongsList: [],
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
    hotSingerList: [],
    // 歌曲列表
    songList: [],
    // 当前播放的歌曲
    currentPlay: null,
    // 当前播放歌曲歌词
    lyric: '',
    // 当前歌曲URL
    songUrl: null
  },
  mutations: {
    setreSongsList(state, songsList) {
      state.reSongsList = songsList
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin
    },
    setEverydaySongsList(state, everyDaySongsList) {
      state.everyDayList = everyDaySongsList
    },
    setSongs(state, songs) {
      state.everydaySongs = songs
    },
    setNewDiscList(state, newDiscList) {
      state.newDiscList = newDiscList
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
    },
    setSongList(state, songs) {
      if (!songs) return
      if (state.songList.length === 0) state.songList.push(...songs)
      if (songs.length > 1) {
        state.songList = songs
      } else {
        songs.forEach(item => {
          if (state.songList.every(val => val.id !== item.id)) {
            state.songList.push(item)
          }
        })
      }
      // 将歌曲信息存到本地
      window.localStorage.setItem('songList', JSON.stringify(state.songList))
    },
    setCurrentPlay(state, song) {
      if (song.isPlay) {
        song.song.isPlay = song.isPlay
        song = song.song
      }
      this.dispatch('getSongUrl', song.id)
      state.currentPlay = song
      window.localStorage.setItem('currentPlay', JSON.stringify(state.currentPlay))
    },
    // 写入歌词
    setLyric(state, lyric) {
      // 第一步 将字符串分割为数组
      const arr1 = lyric.split(/\n/)
      arr1.splice(arr1.length - 1, 1)
      // 第二步 将数组里面每个字符串转换为对象
      const arr2 = []
      if (lyric.match(/\[[\S]+\]/)) {
        arr1.forEach(item => {
          let time = item.match(/\[[\S]+\]/)[0]
          time = time && time.replace('[', '').replace(']', '')
          time = (parseInt(time.split(':')[0]) * 60 + parseFloat(time.split(':')[1])).toFixed(2)
          const content = item.split(']')[1] || ''
          const obj = {
            time,
            content
          }
          arr2.push(obj)
        })
      } else {
        arr1.forEach(item => {
          const content = item
          const obj = {
            content,
            time: 0
          }
          arr2.push(obj)
        })
        arr2.unshift({ content: '*该歌词不支持自动滚动* ' })
      }
      state.lyric = arr2
    },
    // 写入歌曲URL
    setSongUrl(state, url) {
      // 给每个歌曲URL添加标记 使每一个URL都是不同的
      url += '#' + Math.floor(Math.random() * 1000000)
      state.songUrl = url
    },
    removeTopThreeListdetail(state) {
      state.topThreeListdetail = []
    },
    removeSongList(state, id) {
      if (id === undefined) {
        state.songList = []
        state.currentPlay = null
        state.lyric = []
        state.songUrl = null

        window.localStorage.removeItem('songList')
        window.localStorage.removeItem('currentPlay')
      } else {
        // 当删除的是当前播放的歌曲时
        if (state.currentPlay.id === id) {
          const index = state.songList.findIndex(item => item.id === state.currentPlay.id)
          if (state.songList[index + 1]) {
            state.currentPlay = state.songList[index + 1]
          } else if (state.songList[index - 1]) {
            state.currentPlay = state.songList[index - 1]
          } else {
            state.currentPlay = null
          }
          state.currentPlay && this.dispatch('getSongUrl', state.currentPlay.id)

          // 重新更新本地存储数量
          window.localStorage.setItem('currentPlay', JSON.stringify(state.currentPlay))
        }
        // 查找索引删除指定元素
        const index = state.songList.findIndex(item => item.id === id)
        state.songList.splice(index, 1)
        // 重新更新本地存储数量
        window.localStorage.setItem('songList', JSON.stringify(state.songList))
      }
    }
  },
  actions: {
    // 获取歌单列表
    async getSongsList({ commit }, limit) {
      const { data } = await reSongsListAPI(limit)
      commit('setreSongsList', data.result)
    },
    // 获取每日推荐歌单列表
    async getEverydaySongsList({ commit }) {
      const { data: result } = await everydaySongsListAPI()
      commit('setEverydaySongsList', result.recommend)
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
      const { data: result } = await songsDetailsAPI(id)
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
    },
    // 获取歌曲详情
    async getSongDetails({ commit }, ids) {
      // 获取歌曲详情
      const { data: result } = await songDetailsAPI(ids)
      commit('setSongList', result.songs)
      commit('setCurrentPlay', result.songs[0])
    },
    // 获取歌单详情
    async getsongsDetails({ commit }, id) {
      const { data: result } = await songsDetailsAPI(id)
      commit('setSongList', result.playlist.tracks)
      commit('setCurrentPlay', result.playlist.tracks[0])
    },
    // 获取专辑详情
    async getAlbumDetails({ commit }, id) {
      const { data: result } = await albumDetailsAPI(id)
      commit('setSongList', result.songs)
      commit('setCurrentPlay', result.songs[0])
    },
    // 获取歌词
    async getLyric({ commit }, id) {
      const { data: result } = await lyricAPI(id)
      commit('setLyric', result.lrc.lyric)
    },
    // 获取歌曲URL
    async getSongUrl({ commit }, id) {
      const { data: result } = await songUrlAPI(id)
      commit('setSongUrl', result.data[0].url)
    }

  },
  getters: {
    daySongsList(state) {
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
      const newSongsList = []
      index.forEach(item => {
        newSongsList.push(state.everyDayList[item])
      })
      if (newSongsList[0] === undefined) return false
      return newSongsList
    },
    oneNewDisc(state) {
      return state.newDiscList.slice(0, 5)
    },
    twoNewDisc(state) {
      return state.newDiscList.slice(5, 10)
    },
    // 播放列表歌曲数量
    songTotal(state) {
      return state.songList.length
    }
  }
})
