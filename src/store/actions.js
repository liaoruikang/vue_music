import {
  songsDetailsAPI,
  songDetailsAPI,
  albumDetailsAPI
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
  }
}
