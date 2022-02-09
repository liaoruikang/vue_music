<template>
  <div>
    <el-button @click="loginDialogVisible = true">登录</el-button>

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

// 导入 eventBus
import Bus from '@/plugin/eventBus'
export default {
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
      loginMode: 'login'
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
  },
  components: {
    Login,
    LoginPhone,
    LoginEmail,
    LoginQrCode,
    Register,
    ResetPassword
  },
  watch: {
    loginDialogVisible() {
      if (this.loginDialogVisible === false) {
        setTimeout(() => {
          this.loginMode = 'login'
        }, 300)
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
</style>
