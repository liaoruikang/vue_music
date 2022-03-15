import Vue from 'vue'
import Vuex from 'vuex'

// 导入vuex节点
import state from './state'
import mutations from './mutations'
import actions from './actions'

// 导入module节点模块
import user from './user'
import hot from './discover/hot'
import individuation from './discover/individuation'
import list from './discover/list'
import newdisc from './discover/newdisc'
import play from './play'
import insinger from './discover/insinger'
import collection from './collection'
import forward from './forward'
import toplist from './toplist'
import comment from './comment'
import playlist from './playlist'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    user,
    hot,
    individuation,
    list,
    newdisc,
    play,
    insinger,
    collection,
    forward,
    toplist,
    comment,
    playlist
  }
})
