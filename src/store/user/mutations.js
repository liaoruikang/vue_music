export default {
  setUserData(state, userData) {
    state.userData = userData
  },
  removeUserData(state) {
    state.userData = null
  },
  setUserLevel(state, userLevel) {
    state.userLevel = userLevel
  },
  setIsLogin(state, isLogin) {
    state.isLogin = isLogin
  },
  setUserId(state, userId) {
    state.userId = userId
  },
  setVipData(state, Data) {
    state.vipData = Data
  },
  setRecord(state, val) {
    state.record = val
  },
  reomveRecord(state) {
    state.record = null
  }
}
