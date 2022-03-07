import { lyricAPI, songUrlAPI } from '@/api/playAPI'
export default {
  // 获取歌词
  async getLyric({ commit }, id) {
    const { data: result } = await lyricAPI(id)
    commit('setLyric', result.lrc.lyric)
  },
  // 获取歌曲URL
  async getSongUrl({ commit }, id) {
    const { data: result } = await songUrlAPI(id, 128000)
    commit('setSongUrl', result.data[0].url)
  }
}
