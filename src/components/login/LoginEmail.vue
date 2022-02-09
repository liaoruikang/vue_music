<template>
  <div>
    <LoginHeader>
      <template>邮箱登录</template>
    </LoginHeader>
    <!-- 主体部分 -->
    <el-row class="email__main">
      <el-form :model="emailForm" :rules="emailFormRules" ref="emailFormRef">
        <el-form-item prop="email">
          <el-input
            v-model="emailForm.email"
            size="small"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="emailForm.password"
            size="small"
            placeholder="请输入密码"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-row class="email__row">
          <el-col :span="8">
            <input type="checkbox" checked /> 自动登录
          </el-col>
          <el-col :span="7" :offset="9">
            <a href="javascript:;" @click="mode('resetPassword')">忘记密码？</a>
          </el-col>
        </el-row>
        <el-row>
          <LoginBtn color="#fff" @btnClick="login">登录</LoginBtn>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="email__footer">
      <a href="javascript:;" class="other" @click="mode('login')"
        >&lt;&nbsp; 其他登录方式</a
      >
    </el-row>
  </div>
</template>
<script>
import LoginHeader from '@/components/login/LoginHeader'

// 导入 eventBus
import Bus from '@/plugin/eventBus'
// 导入 LoginBtn
import LoginBtn from '@/components/login/LoginBtn'
// 导入 emailLoginAPI
import { emailLoginAPI } from '@/api/loginAPI'

export default {
  data() {
    // 正则表达式验证
    const email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    const isEmail = (rule, value, callback) => {
      if (!email.test(value)) {
        callback(new Error('请填写正确的邮箱'))
      } else {
        callback()
      }
    }
    return {
      // 定义表单对象
      emailForm: {
        email: '',
        password: ''
      },
      // 定义表单验证规则对象
      emailFormRules: {
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          { validator: isEmail, trigger: 'blur' }
        ],
        password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
      }
    }
  },
  created() {},
  methods: {
    mode(val) {
      Bus.$emit('mode', val)
    },
    // 登录
    login() {
      this.$refs.emailFormRef.validate(async (vaild) => {
        if (!vaild) return
        const { data: result } = await emailLoginAPI(this.emailForm).catch(
          () => {
            return this.$message.error('邮箱不存在')
          }
        )
        if (result.code !== 200) return this.$message.error(result.message)
        this.$message.success('登录成功')
        Bus.$emit('Visible', false)
      })
    }
  },
  components: {
    LoginHeader,
    LoginBtn
  }
}
</script>
<style lang="less" scoped>
// 主体区域
.email__main {
  background-color: #fff;
  .el-form {
    width: 220px;
    margin: 0 auto;
    padding: 30px 0 43px 0;
  }
}
.email__row {
  font-size: 12px;
  margin-bottom: 15px;
  input {
    vertical-align: middle;
  }
}
// 底部区域
.email__footer {
  padding: 0 19px;
  height: 48px;
  border-top: 1px solid #c6c6c6;
  line-height: 48px;
  background-color: #f7f7f7;
  font-size: 12px;
  .other {
    float: left;
    color: #0c72c3;
  }
}
</style>
