import { hotSingerAPI } from '@/api/discoverAPI'
import { singerListAPI, singerDetailAPI, artistAlbumAPI, artistMvAPI, artistDescAPI, simiArtistAPI } from '@/api/artistAPI'
export default {
  // 获取热门歌手数据
  async getHotSingerList({ commit }, val) {
    const { data: result } = await hotSingerAPI(val.limit, val.offset)
    commit('setHotSingerList', result)
    return result
  },
  async getSingerList({ commit }, val) {
    const { data: result } = await singerListAPI(val.limit, val.offset, val.initial, val.type, val.area)
    commit('setSingerList', result)
  },
  // 获取歌手详情
  async getSingerDetail({ commit }, id) {
    const { data: result } = await singerDetailAPI(id)
    if (result.code !== 200) return
    commit('setSingerDetail', result)
  },
  async getArtistAlbum({ commit }, val) {
    const { data: result } = await artistAlbumAPI(val.id, val.limit, val.offset)
    if (result.code !== 200) return
    commit('setArtistAlbum', result)
  },
  async getArtistMv({ commit }, val) {
    const { data: result } = await artistMvAPI(val.id, val.limit, val.offset)
    if (result.code !== 200) return
    commit('setArtistMv', result)
  },
  async getArtistDesc({ commit }, id) {
    const { data: result } = await artistDescAPI(id)
    if (result.code !== 200) return
    commit('setArtisDesc', result)
  },
  async getSimiArtist({ commit }, id) {
    const { data: result } = await simiArtistAPI(id)
    if (result.code !== 200) return
    commit('setSimiArtist', result)
  }
}
