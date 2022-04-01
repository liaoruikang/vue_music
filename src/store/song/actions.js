import { songDetailsAPI, simiSongAPI } from '@/api/songDetailsAPI'
import { lyricAPI } from '@/api/playAPI'
import { simiPlaylistAPI } from '@/api/playlistAPI'
export default {
  async getSongDetail({ commit }, id) {
    const { data: result } = await songDetailsAPI(id)
    if (result.code !== 200) return
    commit('setSongDetail', result.songs[0])
  },
  async getLyric({ commit }, id) {
    const { data: result } = await lyricAPI(id)
    if (result.code !== 200) return
    commit('setLyric', result)
  },
  async getSimiSong({ commit }, id) {
    const { data: result } = await simiSongAPI(id)
    if (result.code !== 200) return
    commit('setSimiSong', result)
  },
  async getSimiPlaylist({ commit }, id) {
    const { data: result } = await simiPlaylistAPI(id)
    if (result.code !== 200) return
    commit('setSimiPlaylist', result)
  }
}
