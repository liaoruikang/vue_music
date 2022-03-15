import { commentAPI } from '@/api/commentAPI'
export default {
  // 获取评论
  async getComment({ commit }, commentForm) {
    const { data: result } = await commentAPI(commentForm.id, commentForm.type, commentForm.pageNo, commentForm.pageSize, commentForm.sortType, commentForm.cursor)
    if (!result.code || result.code !== 200) return
    commit('setComment', result.data)
  }
}
