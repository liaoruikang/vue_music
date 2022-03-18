export default {
  // 前十条数据
  catSingerList(state) {
    if (!state.GlobalSingerList) return null
    return state.GlobalSingerList.filter((item, index) => index < 10)
  },
  singerList(state) {
    if (!state.GlobalSingerList) return null
    return state.GlobalSingerList.filter((item, index) => index > 9)
  }
}
