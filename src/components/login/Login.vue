<template>
  <!-- 选择登录方式 -->
  <div class="login__container">
    <!-- 登录对话框头部标题部分 -->
    <LoginHeader>
      <template>登录</template>
    </LoginHeader>
    <!-- 登录对话框主体部分 -->
    <div class="dialog__body">
      <div class="login__main">
        <!-- 左侧手机号和注册选项按钮 -->
        <div class="login__plt"></div>
        <!-- 封装了一个按钮组件 并使用 -->
        <LoginBtn color="#fff" @btnClick="mode('loginPhone')">
          手机号登录
        </LoginBtn>
        <LoginBtn background="#FFFFFF" @btnClick="mode('register')"
          >注&nbsp;&nbsp;&nbsp;&nbsp;册</LoginBtn
        >
      </div>
      <!-- 右侧更多登录方式选项卡 -->
      <div class="login__art">
        <ul>
          <li>
            <i></i>
            微信登录（未开放）
          </li>
          <li>
            <i></i>
            QQ登录（未开放）
          </li>
          <li>
            <i></i>
            微博登录（未开放）
          </li>
          <li @click="mode('LoginEmail')">
            <i></i>
            网易邮箱帐号登录
          </li>
        </ul>
      </div>
    </div>
    <!-- 底部服务条款 -->
    <div class="dialog__footer">
      <input type="checkbox" ref="checkboxRef" /> 同意
      <a href="https://st.music.163.com/official-terms/service">
        《服务条款》
      </a>
      <a href="https://st.music.163.com/official-terms/privacy">
        《隐私政策》 </a
      ><a href="https://st.music.163.com/official-terms/children">
        《儿童隐私政策》
      </a>
    </div>
    <!-- 二维码登录按钮 -->
    <div class="qr__code" @click="mode('LoginQrCode')"></div>
  </div>
</template>
<script>
// 导入 loginBtn 组件
import LoginBtn from '@/components/login/LoginBtn'
// 导入 LoginHeader 头部标签组件
import LoginHeader from '@/components/login/LoginHeader'
export default {
  name: 'Login',
  components: {
    LoginBtn,
    LoginHeader
  },
  methods: {
    mode(val) {
      if (!this.$refs.checkboxRef.checked) {
        return this.$message({
          type: 'warning',
          message: '请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》'
        })
      }

      this.$emit('loginMode', val)
    }
  }
}
</script>
<style lang="less" scoped>
.login__container {
  position: relative;
}

.dialog__body {
  padding: 40px 0 0;
  background-color: #fff;
  display: flex;
  .login__main {
    width: 224px;
    padding: 0 35px 3px 40px;
    border-right: 1px dotted #ccc;
    .login__plt {
      width: 224px;
      height: 118px;
      background: url('../../assets/uploads/platform.png');
      background-size: 100%;
      margin-bottom: 15px;
    }
  }
  .login__art {
    padding: 0 0 0 39px;
    flex: 1;
    ul {
      margin-top: -15px;
      li {
        cursor: pointer;
        margin-top: 15px;
        font-size: 12px;
        i {
          display: inline-block;
          width: 38px;
          height: 38px;
          background: url('../../assets/uploads/logo.png') no-repeat;
          margin-right: 12px;
          vertical-align: middle;
        }
      }
      li:nth-child(1) i {
        background-position: -150px -670px;
      }
      li:nth-child(2) i {
        background-position: -190px -670px;
      }
      li:nth-child(3) i {
        background-position: -231px -670px;
      }
      li:nth-child(4) i {
        background-position: -271px -670px;
      }
      li:hover {
        text-decoration: underline;
      }
    }
  }
}
.dialog__footer {
  height: 20px;
  margin: 30px 0 0 40px;
  padding-bottom: 39px;
  font-size: 12px;
  color: #00000066;
  input {
    vertical-align: middle;
  }
  a {
    color: #507daf;
  }
  a:hover {
    text-decoration: underline;
  }
}
.qr__code {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 52px;
  height: 52px;
  background: url('../../assets/uploads/qr_login_icon.png');
  background-size: 100%;
  cursor: pointer;
}
</style>
