import Vue from 'vue'
import Vuex from 'vuex'

// 导入vuex节点
import state from './state'
import mutations from './mutations'
import actions from './actions'

// 导入module节点模块
import user from './user'
import hot from './hot'
import individuation from './individuation'
import list from './list'
import newdisc from './newdisc'
import play from './play'
import insinger from './insinger'
import collection from './collection'

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
    collection
  }
})
