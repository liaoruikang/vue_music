<template>
  <div
    class="app__container"
    style="height: 100vh; overflow-x: hidden"
    @click="blur"
  >
    <!-- 头部区域 -->
    <Header
      :isLogin="isLogin"
      :userImg="userData && userData.avatarUrl"
      @logout="logout"
    ></Header>
    <!-- 路由占位符 -->
    <router-view></router-view>
    <!-- 底部区域 -->
    <Bottom></Bottom>
    <!-- 登录对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="loginDialogVisible"
      width="530px"
      :show-close="false"
      :modal="false"
      @click.native.stop
    >
      <keep-alive include="Login">
        <component :is="loginMode" @loginMode="loginMode = $event"></component>
      </keep-alive>
    </el-dialog>

    <!-- 收藏转发下载对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="$store.state.CFDVisible"
      :show-close="false"
      :modal="false"
      custom-class="cfd__dialog"
      @click.native.stop
    >
      <component :is="displayWho"></component>
    </el-dialog>

    <!-- 播放控件 -->
    <Play></Play>
    <!-- 回到顶部控件 -->
    <el-backtop target=".app__container" :bottom="100" :visibility-height="300">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
          text-align: center;
          line-height: 40px;
          color: #c20c0c;
          text-indent: -1px;
          z-index: 1;
        "
      >
        <i style="font-weight: 900" class="el-icon-top"></i>
      </div>
    </el-backtop>
  </div>
</template>
<script>
import { loginStateAPI, logoutAPI } from '@/api/loginAPI'
// 导入 eventBus
import Bus from '@/plugin/eventBus'
import { mapState } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      // 控制登录对话框显示与隐藏
      loginDialogVisible: false,
      // 控制登录方式
      // login: 选择登录方式
      // loginPhone 手机号登录
      // loginEmail 邮箱登录
      // loginQrCode 二维码登录
      // register 注册
      // resetPassword 重置密码
      loginMode: 'login',
      dialogDOM: null,
      // 当前登录用户数据
      userData: null,
      isLogin: null
    }
  },
  created() {
    // 监听Bus的自定义事件
    Bus.$on('Visible', (val) => {
      this.loginDialogVisible = val
    })
    Bus.$on('mode', (val) => {
      this.loginMode = val
    })
    Bus.$on('headerPosition', (e) => {
      const domWidth = document.documentElement.clientWidth
      const domHeight = document.documentElement.clientHeight

      if (e.x + this.dialogDOM.offsetWidth >= domWidth) {
        e.x = domWidth - this.dialogDOM.offsetWidth
      } else if (e.x <= 0) {
        e.x = 0
      }
      if (e.y + this.dialogDOM.offsetHeight >= domHeight) {
        e.y = domHeight - this.dialogDOM.offsetHeight
      } else if (e.y <= 0) {
        e.y = 0
      }
      this.dialogDOM.style.top = e.y + this.dialogDOM.offsetHeight / 2 + 'px'
      this.dialogDOM.style.left = e.x + this.dialogDOM.offsetWidth / 2 + 'px'
    })
    Bus.$on('loginData', (data) => {
      this.userData = data
      this.$store.commit('user/setUserId', data.userId)
    })

    this.loginState()
  },
  components: {
    Login: () =>
      import(/* webpackChunkName: "Login" */ '@/components/login/Login'),
    LoginPhone: () =>
      import(/* webpackChunkName: "Login" */ '@/components/login/LoginPhone'),
    LoginEmail: () =>
      import(/* webpackChunkName: "Login" */ '@/components/login/LoginEmail'),
    LoginQrCode: () =>
      import(/* webpackChunkName: "Login" */ '@/components/login/LoginQrCode'),
    Register: () =>
      import(/* webpackChunkName: "Login" */ '@/components/login/Register'),
    ResetPassword: () =>
      import(
        /* webpackChunkName: "Login" */ '@/components/login/ResetPassword'
      ),
    Header: () =>
      import(/* webpackChunkName: "Header" */ '@/components/Header'),
    Bottom: () =>
      import(/* webpackChunkName: "Button" */ '@/components/Bottom'),
    Play: () => import(/* webpackChunkName: "Pbay" */ '@/components/Play'),
    LoginHeader: () =>
      import(
        /* webpackChunkName: "loginHeader"  */ '@/components/login/LoginHeader'
      ),
    Collection: () =>
      import(/* webpackChunkName: "Collection" */ '@/components/Collection'),
    Client: () =>
      import(/* webpackChunkName: "Client" */ '@/components/Client'),
    Forward: () =>
      import(/* webpackChunkName: "Forward" */ '@/components/Forward')
  },
  watch: {
    loginDialogVisible() {
      if (this.loginDialogVisible === false) {
        setTimeout(() => {
          this.loginMode = 'login'
        }, 300)
      } else {
        this.dialogDOM = document.querySelectorAll('.el-dialog')[0]
      }
    },
    CFDVisible(val) {
      if (val) this.dialogDOM = document.querySelectorAll('.el-dialog')[1]
    },
    userData: {
      handler() {
        if (this.userData !== null) {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      }
    },
    isLogin(val) {
      this.$store.commit('user/setIsLogin', this.isLogin)
      if (val === false) {
        this.$store.commit('setVipData', null)
      } else {
        this.$store.dispatch('user/getVipData')
      }
    },
    displayWho(val) {
      if (val && val !== 'Client') {
        if (!this.isLogin) {
          this.$store.commit('setCFDVisible', {
            display: false,
            component: null
          })
          this.loginDialogVisible = true
        }
      }
    }
  },
  methods: {
    // 检测用户是否登录
    async loginState() {
      const { data: result } = await loginStateAPI()
      if (result.data.profile === null) return (this.isLogin = false)
      this.userData = result.data.profile
      this.$store.commit('user/setUserId', result.data.profile.userId)
    },
    // 退出登录
    async logout() {
      const { data: result } = await logoutAPI()
      if (result.code === 200) {
        this.$message.success('退出成功')
        this.userData = null
        this.$store.commit('user/setUserId', null)
        this.$store.commit('user/setUserData', {})
        this.$store.commit('user/setUserLevel', null)
      }
    },
    blur() {
      Bus.$emit('display', false)
    }
  },
  computed: {
    ...mapState(['CFDVisible', 'displayWho'])
  }
}
</script>
<style lang="less" scoped>
/deep/ .el-dialog {
  box-shadow: 0 5px 16px rgb(0 0 0 / 80%);
  border-radius: 4px;
  overflow: hidden;
}
/deep/ .el-dialog__body,
/deep/ .el-dialog__header {
  padding: 0;
}
/deep/ .el-dialog {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 !important;
  box-shadow: 0 5px 16px rgb(0, 0, 0, 80%) !important;
}
/deep/ .el-backtop {
  right: 50% !important;
  margin-right: -550px;
}
/deep/ .cfd__dialog {
  width: auto !important;
}
</style>
