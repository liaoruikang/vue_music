<template>
  <div class="app__container">
    <!-- 头部区域 -->
    <Header
      :isLogin="isLogin"
      :userImg="userData && userData.avatarUrl"
      @logout="logout"
    ></Header>
    <!-- 路由占位符 -->
    <router-view></router-view>

    <!-- 登录对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="loginDialogVisible"
      width="530px"
      :show-close="false"
      :modal="false"
    >
      <keep-alive include="Login">
        <component :is="loginMode" @loginMode="loginMode = $event"></component>
      </keep-alive>
    </el-dialog>
  </div>
</template>
<script>
import Login from '@/components/login/Login.vue'
import LoginPhone from '@/components/login/LoginPhone.vue'
import LoginEmail from '@/components/login/LoginEmail.vue'
import LoginQrCode from '@/components/login/LoginQrCode.vue'
import Register from '@/components/login/Register.vue'
import ResetPassword from '@/components/login/ResetPassword.vue'
import Header from '@/components/Header'

import { loginStateAPI, logoutAPI } from '@/api/loginAPI'
// 导入 eventBus
import Bus from '@/plugin/eventBus'
// 导入 API 接口
// import { loginStateAPI } from '@/api/loginAPI'
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
    })
    this.loginState()
  },
  components: {
    Login,
    LoginPhone,
    LoginEmail,
    LoginQrCode,
    Register,
    ResetPassword,
    Header
  },
  watch: {
    loginDialogVisible() {
      if (this.loginDialogVisible === false) {
        setTimeout(() => {
          this.loginMode = 'login'
        }, 300)
      }
      this.dialogDOM = document.querySelector('.el-dialog')
    },
    userData: {
      handler() {
        this.userData !== null ? (this.isLogin = true) : (this.isLogin = false)
      }
    }
  },
  methods: {
    // 检测用户是否登录
    async loginState() {
      const { data: result } = await loginStateAPI()
      if (result.data.profile === null) return (this.isLogin = false)
      this.userData = result.data.profile
    },
    // 退出登录
    async logout() {
      const { data: result } = await logoutAPI()
      if (result.code === 200) {
        this.$message.success('退出成功')
        this.userData = null
      }
    }
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
}
</style>
