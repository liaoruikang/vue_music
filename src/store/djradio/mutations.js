export default {
  // 写入电台分类数据
  setDjCatelist(state, val) {
    state.djCatelist = val
  },
  // 写入推荐节目数据
  setRecommend(state, val) {
    state.recommend = val
  },
  // 写入节目排行榜数据
  setRanking(state, val) {
    state.ranking = val
  },
  // 写入推荐分类数据
  setRecommendCategory(state, val) {
    if (!val) {
      state.recommendCategory = val
      return
    }
    val = val.filter(item => {
      if ('音乐推荐,生活,情感,创作翻唱,知识'.includes(item.categoryName)) {
        return item
      }
    })
    state.recommendCategory = val
  },
  // 写入分类电台列表数据
  setRecommendDjList(state, val) {
    state.recommendDjList = val
  }
}
