import {
  songsDetailsAPI,
  songDetailsAPI,
  albumDetailsAPI,
  radioDetailsAPI
} from '@/api/songDetailsAPI'

export default {
  // 获取歌曲详情
  async getSongDetails({ commit }, ids) {
    // 获取歌曲详情
    const { data: result } = await songDetailsAPI(ids)
    commit('play/setSongList', result.songs)
    commit('play/setCurrentPlay', result.songs[0])
  },
  // 获取歌单详情
  async getsongsDetails({ commit }, id) {
    const { data: result } = await songsDetailsAPI(id)
    commit('play/setSongList', result.playlist.tracks)
    commit('play/setCurrentPlay', result.playlist.tracks[0])
  },
  // 获取专辑详情
  async getAlbumDetails({ commit }, id) {
    const { data: result } = await albumDetailsAPI(id)
    commit('play/setSongList', result.songs)
    commit('play/setCurrentPlay', result.songs[0])
  },
  // 获取电台详情
  async getRadioDetails({ commit }, id) {
    const { data: result } = await radioDetailsAPI(id)
    const { data: res } = await songDetailsAPI(result.program.mainSong.id)
    res.songs[0].name = result.program.mainSong.name
    res.songs[0].al.picUrl = result.program.radio.picUrl
    res.songs[0].ar[0].name = result.program.radio.name
    res.songs[0].ar[0].id = result.program.radio.id
    commit('play/setSongList', res.songs)
    commit('play/setCurrentPlay', res.songs[0])
  },
  // 添加歌曲
  async addSong({ commit }, ids) {
    // 获取歌曲详情
    const { data: result } = await songDetailsAPI(ids)
    commit('play/addSongs', result.songs)
  },
  // 添加歌单到歌曲列表
  async addSongs({ commit }, id) {
    // 获取歌单详情
    const { data: result } = await songsDetailsAPI(id)
    commit('play/addSongs', result.playlist.tracks)
  },
  async addAlbum({ commit }, id) {
    const { data: result } = await albumDetailsAPI(id)
    commit('play/addAlbum', result.songs)
  },
  async addProgram({ commit }, id) {
    const { data: result } = await radioDetailsAPI(id)
    const { data: res } = await songDetailsAPI(result.program.mainSong.id)
    res.songs[0].name = result.program.mainSong.name
    res.songs[0].al.picUrl = result.program.radio.picUrl
    res.songs[0].ar[0].name = result.program.radio.name
    res.songs[0].ar[0].id = result.program.radio.id
    commit('play/setSongList', res.songs)
  }
}
